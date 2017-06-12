import React from "react";
import { WindowScroller } from "react-virtualized/dist/commonjs/WindowScroller";

import GridSizer from "./grid-sizer";

export default class Grid extends React.Component<OwnProps, {}> {
	render() {
		return (
			<WindowScroller scrollElement={this.props.scrollElement}>
				{this.renderGridSizer}
			</WindowScroller>
		);
	}

	renderGridSizer = ({ height, isScrolling, scrollTop }: any) => {
		const { rowHeight, cellWidth, items } = this.props;
		return (
			<GridSizer
				height={height}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
				cellWidth={cellWidth}
				rowHeight={rowHeight}
				items={items}
			/>
		);
	}
}

export interface OwnProps {
	rowHeight: number;
	cellWidth: number;
	scrollElement?: any;
	items: any[];
}
