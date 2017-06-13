import React from "react";

import { LoadGridElements } from "./common";
import InfiniteScroll from "components/infinite-scroll";

export default class GridContent extends React.Component<OwnProps, State> {
	private grid: HTMLElement;
	private memoizedLoads: { [key: number]: boolean } = {};

	constructor(props: OwnProps) {
		super(props);
		this.state = { rowCount: 0, columnCount: 0 };
	}

	componentWillReceiveProps(props: OwnProps) {
		const { columnWidth, fullWidth, items } = props;
		const { rowCount, columnCount } = this.calculateDimensions(fullWidth, columnWidth, items);
		this.setState({ rowCount, columnCount });
	}

	componentDidUpdate() {
		this.tryFillPageIfNecessary();
	}

	render() {
		const { cellRenderer, rowHeight, items, loadThreshold, scrollElement } = this.props;
		const { rowCount, columnCount } = this.state;

		return (
			<InfiniteScroll
				elementRef={this.setGrid}
				scrollElement={scrollElement}
				loadThreshold={loadThreshold}
				loadElements={this.loadElements}
				style={{
					display: "grid",
					width: "100%",
					gridTemplate: `repeat(${rowCount}, ${rowHeight}px) / repeat(${columnCount}, 1fr)`
				}}
			>
				{items.map((item, index) => (
					<div key={index}>
						{cellRenderer({ item, index })}
					</div>
				))}
			</InfiniteScroll>
		);
	}

	private setGrid = (grid: HTMLElement) => {
		this.grid = grid;
	}

	private loadElements = (fillPageCount = 0) => {
		const { items } = this.props;
		const { rowCount, columnCount } = this.state;

		const startIndex = items.length;
		if (!this.memoizedLoads[startIndex]) {
			this.memoizedLoads[startIndex] = true;

			const fillGridCount = items.length - (rowCount * columnCount);
			this.props.loadElements({ startIndex, fillPageCount: fillPageCount + fillGridCount });
		}
	}

	private tryFillPageIfNecessary = () => {
		const { fullHeight, rowHeight } = this.props;
		const { columnCount } = this.state;
		const gridHeight = this.grid.offsetHeight;

		const heightDiff = fullHeight - gridHeight;
		if (heightDiff > 0) {
			const fillPageCount = Math.ceil(heightDiff / rowHeight) * columnCount;
			this.loadElements(fillPageCount);
		}
	}

	private calculateDimensions = (width: number, columnWidth: number, items: any[]) => {
		const theoreticalColumns = width / columnWidth;

		const minColumns = Math.floor(theoreticalColumns);
		const maxColumns = Math.ceil(theoreticalColumns);

		const minDelta = (width - minColumns * columnWidth) / minColumns;
		const maxDelta = (maxColumns * columnWidth - width) / maxColumns;

		const columnCount = minDelta < maxDelta ? minColumns : maxColumns;
		const rowCount = Math.ceil(items.length / columnCount);
		return { rowCount, columnCount };
	}
}

interface OwnProps {
	container: HTMLElement;
	fullWidth: number;
	fullHeight: number;

	scrollElement: HTMLElement;
	loadThreshold: number;
	loadElements: (params: LoadGridElements) => void;

	items: any[];
	rowHeight: number;
	columnWidth: number;
	cellRenderer: (props: { item: any, index: number }) => JSX.Element;
}

interface State {
	rowCount: number;
	columnCount: number;
}
