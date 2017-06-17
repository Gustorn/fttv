import React from "react";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";

import GridContent from "./content";

export default class Grid extends React.PureComponent<OwnProps, {}> {
	render() {
		return (
			<AutoSizer {...this.props}>
				{this.renderContent}
			</AutoSizer>
		);
	}

	renderContent = ({ width, height }: { width: number, height: number }) => {
		const { items, targetColumnWidth, gridClass, renderer, fillGrid } = this.props;
		const { columnCount, columnWidth } = this.calculateIdealColumnDimensions(width, targetColumnWidth);
		return (
			<GridContent
				gridClass={gridClass}
				items={items}
				renderer={renderer}
				columnCount={columnCount}
				columnWidth={columnWidth}
				width={width}
				height={height}
				fillGrid={fillGrid}
			/>
		);
	}

	private calculateIdealColumnDimensions = (width: number, columnWidth: number) => {
		const theoreticalColumns = width / columnWidth;

		const minColumns = Math.floor(theoreticalColumns);
		const maxColumns = Math.ceil(theoreticalColumns);

		const minDelta = (width - (minColumns * columnWidth)) / minColumns;
		const maxDelta = (width - (maxColumns * columnWidth)) / maxColumns;

		return minDelta < -maxDelta * 10000
			? { columnCount: minColumns, columnWidth: columnWidth + minDelta }
			: { columnCount: maxColumns, columnWidth: columnWidth + maxDelta };
	}
}

interface OwnProps {
	items: any[];
	gridClass?: string;
	targetColumnWidth: number;
	renderer: (props: { item: any, index: number }) => JSX.Element;
	fillGrid?: (requestedElements: number) => void;
}
