import React from "react";
import { Grid, GridCellRangeProps } from "react-virtualized/dist/commonjs/Grid";
import { InfiniteLoader, InfiniteLoaderChildProps } from "react-virtualized/dist/commonjs/InfiniteLoader";

export default class GridContent extends React.Component<OwnProps, State> {
	private onRowsRendered: any;

	constructor(props: OwnProps) {
		super(props);

		const actualSize = GridContent.calculateActualSize(props);
		const rowCount = Math.ceil(props.items.length / actualSize.columnCount);
		this.state = { ...actualSize, rowCount };
	}

	render() {
		return (
			<InfiniteLoader {...this.props} rowCount={1e10}>
				{this.infiniteLoaderChildFunction}
			</InfiniteLoader>
		);
	}

	componentWillReceiveProps(nextProps: OwnProps) {
		const { width, height, items } = this.props;
		if (width !== nextProps.width || height !== nextProps.height) {
			const actualSize = GridContent.calculateActualSize(nextProps);
			const rowCount = Math.ceil(nextProps.items.length / actualSize.columnCount);
			this.setState({ ...actualSize, rowCount });
		} else if (items.length !== nextProps.items.length) {
			const rowCount = Math.ceil(nextProps.items.length / this.state.columnCount);
			this.setState({ ...this.state, rowCount });
		}
	}

	renderCell = ({ key, rowIndex, columnIndex, style }: CellRenderProps) => {
		return (
			<div key={key} style={style}>
				{this.renderCustomCell(rowIndex, columnIndex)}
			</div>
		);
	}

	private renderCustomCell = (rowIndex: number, columnIndex: number) => {
		const { customCell, items } = this.props;
		const { columnCount } = this.state;
		return customCell({ item: items[rowIndex * columnCount + columnIndex], rowIndex, columnIndex });
	}

	private infiniteLoaderChildFunction = ({ onRowsRendered, registerChild }: InfiniteLoaderChildProps) => {
		this.onRowsRendered = onRowsRendered;

		const { width, height, isScrolling, scrollTop, rowHeight } = this.props;
		const { columnCount, columnWidth, rowCount } = this.state;
		return (
			<Grid
				ref={registerChild}
				autoHeight
				width={width}
				height={height}
				isScrolling={isScrolling}
				scrollTop={scrollTop}
				rowHeight={rowHeight}
				cellRenderer={this.renderCell}
				onSectionRendered={this.onSectionRendered}
				rowCount={rowCount}
				columnCount={columnCount}
				columnWidth={columnWidth}
			/>
		);
	}

	private onSectionRendered = ({
		columnStartIndex,
		columnStopIndex,
		rowStartIndex,
		rowStopIndex
	}: GridCellRangeProps) => {
		const { columnCount } = this.state;
		const startIndex = rowStartIndex * columnCount + columnStartIndex;
		const stopIndex = rowStopIndex * columnCount + columnStopIndex;
		this.onRowsRendered({
			startIndex,
			stopIndex
		});
	}

	private static calculateActualSize = (props: OwnProps) => {
		const { width, columnWidth } = props;
		const theoreticalColumns = width / columnWidth;

		const lessColumns = Math.floor(theoreticalColumns);
		const moreColumns = Math.ceil(theoreticalColumns);

		const idealLessColumns = lessColumns * columnWidth;
		const idealMoreColumns = moreColumns * columnWidth;

		const lessColumnsDelta = (width - idealLessColumns) / lessColumns;
		const moreColumnsDelta = (width - idealMoreColumns) / moreColumns;

		return lessColumnsDelta < -moreColumnsDelta
			? { columnCount: lessColumns, columnWidth: columnWidth + lessColumnsDelta }
			: { columnCount: moreColumns, columnWidth: columnWidth + moreColumnsDelta };
	}
}

export interface OwnProps {
	width: number;
	height: number;
	isScrolling: boolean;
	scrollTop: number;
	rowHeight: number;
	columnWidth: number;
	items: any[];
	isRowLoaded: ({ index }: { index: number }) => boolean;
	loadMoreRows: ({ startIndex, stopIndex }: { startIndex: number, stopIndex: number }) => Promise<any[]>;
	customCell: (props: { item: any, rowIndex: number, columnIndex: number }) => JSX.Element;
}

interface State {
	rowCount: number;
	columnCount: number;
	columnWidth: number;
}

interface CellRenderProps {
	key: string | number;
	style: any;
	rowIndex: number;
	columnIndex: number;
}
