import React from "react";

import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";
import { WindowScroller } from "react-virtualized/dist/commonjs/WindowScroller";

import GridContent from "./content";

export default class VirtualGrid extends React.PureComponent<OwnProps, {}> {
	render() {
		const { scrollElement } = this.props;
		return (
			<WindowScroller scrollElement={scrollElement}>
				{({ height, isScrolling, scrollTop }) => (
					<AutoSizer disableHeight>
						{({ width }) => this.renderInner(width, height, isScrolling, scrollTop)}
					</AutoSizer>
				)}
			</WindowScroller>
		);
	}

	private renderInner = (width: number, height: number, isScrolling: boolean, scrollTop: number) => {
		const { items, targetColumnWidth, renderer, rowHeight } = this.props;
		const { columnCount, columnWidth } = this.calculateIdealColumnDimensions(width, targetColumnWidth);
		const rowCount = Math.ceil(items.length / columnCount);

		return (
			<GridContent
				columnCount={columnCount}
				columnWidth={columnWidth}
				height={height}
				isScrolling={isScrolling}
				items={items}
				renderer={renderer}
				rowCount={rowCount}
				rowHeight={rowHeight}
				scrollTop={scrollTop}
				width={width}
			/>
		);
	}

	private calculateIdealColumnDimensions = (width: number, columnWidth: number) => {
		const theoreticalColumns = width / columnWidth;

		const minColumns = Math.floor(theoreticalColumns);
		const maxColumns = Math.ceil(theoreticalColumns);

		const minDelta = (width - (minColumns * columnWidth)) / minColumns;
		const maxDelta = (width - (maxColumns * columnWidth)) / maxColumns;

		return Math.abs(minDelta) < Math.abs(maxDelta)
			? { columnCount: minColumns, columnWidth: columnWidth + minDelta }
			: { columnCount: maxColumns, columnWidth: columnWidth + maxDelta };
	}
}

interface OwnProps {
	items: any[];
	rowHeight: number;
	targetColumnWidth: number;
	scrollElement: HTMLElement;
	renderer: (props: { item: any, index: number }) => JSX.Element;
}
