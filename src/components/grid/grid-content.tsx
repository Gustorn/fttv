import React from "react";
import { Grid } from "react-virtualized";

export default class GridContent extends React.Component<OwnProps, {}> {
	render() {
		const { width, height, isScrolling, scrollTop, onScroll, rowHeight, items } = this.props;
		const { columns, cellWidth } = this.calculateActualSize();
		const rowCount = Math.ceil(items.length / columns);
		console.log(columns);
		console.log(rowCount);
		return (
			<Grid
				autoHeight
				width={width}
				height={height}
				rowHeight={rowHeight}
				columnCount={columns}
				columnWidth={cellWidth}
				cellRenderer={this.renderCell}
				rowCount={rowCount}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
				onScroll={onScroll}
			/>
		);
	}

	renderCell = ({ key, style, columnIndex, rowIndex }: { columnIndex: number, rowIndex: number, key: any, style: any }) => {
		return (
			<div
				key={key}
				style={{ ...style, backgroundColor: (columnIndex + rowIndex) % 2 === 0 ? "grey" : "white" }}
			/>
		);
	}

	private calculateActualSize = () => {
		const { width, cellWidth } = this.props;
		const theoreticalColumns = width / cellWidth;

		const lessColumns = Math.floor(theoreticalColumns);
		const moreColumns = Math.ceil(theoreticalColumns);

		const idealLessColumns = lessColumns * cellWidth;
		const idealMoreColumns = moreColumns * cellWidth;

		const lessColumnsDelta = (width - idealLessColumns) / lessColumns;
		const moreColumnsDelta = (width - idealMoreColumns) / moreColumns;
		console.log(`Less: ${lessColumns}, ${lessColumnsDelta}`);
		console.log(`More: ${moreColumns}, ${moreColumnsDelta}`);

		return lessColumnsDelta < -moreColumnsDelta
			? { columns: lessColumns, cellWidth: cellWidth + lessColumnsDelta }
			: { columns: moreColumns, cellWidth: cellWidth + moreColumnsDelta };
	}
}

export interface OwnProps {
	width: number;
	height: number;
	isScrolling: boolean;
	scrollTop: number;
	onScroll: any;
	rowHeight: number;
	cellWidth: number;
	items: any[];
}
