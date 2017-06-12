import React from "react";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";

import GridContent from "./grid-content";

export default class GridSizer extends React.Component<OwnProps, {}> {
	render() {
		return (
			<AutoSizer disableHeight {...this.props} nonce={this.props.scrollTop.toString()}>
				{this.renderContent}
			</AutoSizer>
		);
	}

	renderContent = ({ width }: { width: number }) => {
		const { height, rowHeight, cellWidth, isScrolling, scrollTop, items } = this.props;
		return (
			<GridContent
				width={width}
				height={height}
				rowHeight={rowHeight}
				cellWidth={cellWidth}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
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
	items: any[];
}
