import React from "react";
import { AutoSizer } from "react-virtualized";

import GridContent from "./grid-content";

export default class GridSizer extends React.Component<OwnProps, {}> {
	render() {
		return (
			<AutoSizer disableHeight>
				{this.renderContent}
			</AutoSizer>
		);
	}

	renderContent = ({ width }: { width: number }) => {
		const { height, rowHeight, cellWidth, isScrolling, onScroll, scrollTop, items } = this.props;
		return (
			<GridContent
				width={width}
				height={height}
				rowHeight={rowHeight}
				cellWidth={cellWidth}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
				onScroll={onScroll}
				items={items}
			/>
		);
	}
}

interface OwnProps {
	height: number;
	rowHeight: number;
	cellWidth: number;
	isScrolling: boolean;
	scrollTop: number;
	onScroll: any;
	items: any[];
}
