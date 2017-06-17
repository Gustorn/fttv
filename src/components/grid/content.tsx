import classnames from "classnames";
import React from "react";

import css from "./content.scss";

export default class GridContent extends React.PureComponent<OwnProps, {}> {
	private grid: HTMLElement;
	private previousItemCount?: number;
	private previousGridHeight?: number;

	componentDidUpdate() {
		const { grid } = this;
		const gridHeight = grid.offsetHeight;
		const { fillGrid } = this.props;
		if (!grid || !fillGrid || !gridHeight) {
			return;
		}

		const { height, columnCount, items } = this.props;

		if (gridHeight < height && items.length !== this.previousItemCount && gridHeight !== this.previousGridHeight) {
			const rowCount = Math.ceil(items.length / columnCount);
			const fillRow = rowCount * columnCount - items.length;

			const emptyRows = Math.ceil((height - gridHeight) / (gridHeight / rowCount));
			const fillEmpty = (emptyRows + 1) * columnCount;

			this.previousItemCount = items.length;
			this.previousGridHeight = gridHeight;
			fillGrid(fillRow + fillEmpty);
		}
	}

	render() {
		const { gridClass, width, items, renderer } = this.props;

		return (
			<div
				ref={this.setGrid}
				className={classnames(css.grid, gridClass)}
				style={{ width, gridTemplateColumns: `repeat(auto-fill, minmax(100px, 1fr))` }}
			>
				{items.map((item, index) => (
					<div key={index} className={css.cellWrapper}>
						{renderer({ item, index })}
					</div>
				))}
			</div>
		);
	}

	private setGrid = (element: HTMLElement) => {
		this.grid = element;
	}
}

interface OwnProps {
	gridClass?: string;
	items: any[];
	width: number;
	height: number;
	columnCount: number;
	columnWidth: number;
	renderer: (props: { item: any, index: number }) => JSX.Element;
	fillGrid?: (requestedElements: number) => void;
}
