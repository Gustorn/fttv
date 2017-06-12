import React from "react";

import Grid from "components/grid";
import DummyCell from "components/grid/cell/dummy";
import Scrollbars from "components/scrollbars";

const dummyItems = [...Array.from(Array(40).keys())];

export default class Directory extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { scrollElement: window, dummyItems };
	}

	render() {
		return (
			<Scrollbars scrollRef={this.setScrollingElement}>
				<div style={{ padding: "0 3em" }}>
					<Grid
						columnWidth={150}
						items={this.state.dummyItems}
						rowHeight={250}
						scrollElement={this.state.scrollElement}
						isRowLoaded={this.isRowLoaded}
						loadMoreRows={this.loadMoreRows}
						customCell={this.renderCell}
					/>
				</div>
			</Scrollbars>
		);
	}

	private isRowLoaded = ({ index }: { index: number }) => {
		return this.state.dummyItems.length > index;
	}

	private loadMoreRows = async ({}: { startIndex: number, stopIndex: number }) => {
		const additionalItems = [...Array(60).keys()];
		const newItems = [...this.state.dummyItems, ...additionalItems];
		this.setState({...this.state, dummyItems: newItems });
		return newItems;
	}

	private setScrollingElement = (scrollElement: any) => {
		this.setState({ scrollElement });
	}

	private renderCell = ({ item, rowIndex, columnIndex }: { item: any, rowIndex: number, columnIndex: number }) => {
		return (
			<DummyCell item={item} rowIndex={rowIndex} columnIndex={columnIndex} />
		);
	}
}

interface State {
	scrollElement: any;
	dummyItems: any[];
}
