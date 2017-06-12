import React from "react";
import { Grid } from "react-virtualized/dist/commonjs/Grid";

export default class GridContent extends React.Component<OwnProps, {}> {
	render() {
		const { width, height, isScrolling, scrollTop, rowHeight, items } = this.props;
		const { columns, cellWidth } = this.calculateActualSize();
		const rowCount = Math.ceil(items.length / columns);
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
			/>
		);
	}

	renderCell = ({ key, style }: CellRenderProps) => {
		return (
			<div
				key={key}
				style={{
					...style,
					background: "url(https://static-cdn.jtvnw.net/ttv-boxart/Casino-272x380.jpg) center no-repeat",
					backgroundSize: "90%"
				}}
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
	rowHeight: number;
	cellWidth: number;
	items: any[];
}

interface CellRenderProps {
	key: string | number;
	style: any;
	rowIndex: number;
	columnIndex: number;
}
