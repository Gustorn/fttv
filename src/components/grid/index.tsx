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
		return (
			<GridSizer
				height={height}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
				{...this.props}
			/>
		);
	}
}

export interface OwnProps {
	rowHeight: number;
	columnWidth: number;
	scrollElement?: any;
	isRowLoaded: ({ index }: { index: number }) => boolean;
	loadMoreRows: ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => Promise<any[]>;
	customCell: (props: { item: any, rowIndex: number, columnIndex: number }) => JSX.Element;
	items: any[];
}
