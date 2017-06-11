import React from "react";
import { WindowScroller } from "react-virtualized";

import GridSizer from "./grid-sizer";

export default class Grid extends React.Component<OwnProps, {}> {
	render() {
		return (
			<WindowScroller scrollElement={this.props.scrollElement}>
				{this.renderGridSizer}
			</WindowScroller>
		);
	}

	renderGridSizer = ({ height, isScrolling, scrollTop, onChildScroll }: any) => {
		const { rowHeight, cellWidth, items } = this.props;
		return (
			<GridSizer
				height={height}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
				onScroll={onChildScroll}
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
