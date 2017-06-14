import React from "react";

import { Grid } from "react-virtualized/dist/commonjs/Grid";

export default class GridContent extends React.PureComponent<OwnProps, {}> {
	render() {
		const {
			width, height, rowCount, columnCount,
			rowHeight, columnWidth, isScrolling, scrollTop
		} = this.props;
		return (
			<Grid
				autoHeight
				width={width}
				height={height}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
				rowCount={rowCount}
				columnCount={columnCount}
				columnWidth={columnWidth}
				rowHeight={rowHeight}
				cellRenderer={this.renderCell}
			/>
		);
	}

	renderCell = ({ key, rowIndex, columnIndex, style }: any) => {
		const { renderer, columnCount, items } = this.props;
		const index = rowIndex * columnCount + columnIndex;
		if (index >= items.length) {
			return null;
		}

		return (
			<div key={key} style={style}>
				{renderer({ item: items[index], index })}
			</div>
		);
	}
}

interface OwnProps {
	items: any[];
	renderer: (props: { item: any, index: number }) => JSX.Element;
	width: number;
	height: number;
	rowCount: number;
	columnCount: number;
	rowHeight: number;
	columnWidth: number;
	isScrolling: boolean;
	scrollTop: number;
}
