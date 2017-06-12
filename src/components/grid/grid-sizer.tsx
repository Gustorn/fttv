import React from "react";
import { AutoSizer } from "react-virtualized/dist/commonjs/AutoSizer";

import GridContent from "./grid-content";

export default class GridSizer extends React.Component<OwnProps, {}> {
	render() {
		return (
			<AutoSizer disableHeight {...this.props}>
				{this.renderContent}
			</AutoSizer>
		);
	}

	renderContent = ({ width }: { width: number }) => {
		return (
			<GridContent width={width} {...this.props} />
		);
	}
}

interface OwnProps {
	height: number;
	rowHeight: number;
	columnWidth: number;
	isScrolling: boolean;
	scrollTop: number;
	items: any[];
	isRowLoaded: ({ index }: { index: number }) => boolean;
	loadMoreRows: ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => Promise<any[]>;
	customCell: (props: { item: any, rowIndex: number, columnIndex: number }) => JSX.Element;
}
