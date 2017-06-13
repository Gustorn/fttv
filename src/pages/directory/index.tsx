import React from "react";

import Grid, { LoadGridElements } from "components/grid";
import DummyCell from "components/grid/cell/dummy";
import Scrollbars from "components/scrollbars";

const dummyItems = [...Array.from(Array(60).keys())];

export default class Directory extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { scrollElement: window, dummyItems };
	}

	render() {
		return (
			<Scrollbars scrollRef={this.setScrollingElement}>
				<div style={{ padding: "0 3em", height: "100%" }}>
					<Grid
						scrollElement={this.state.scrollElement}
						rowHeight={250}
						columnWidth={150}
						cellRenderer={this.renderCell}
						loadElements={this.loadElements}
						loadThreshold={250}
						items={this.state.dummyItems}
					/>
				</div>
			</Scrollbars>
		);
	}

	private setScrollingElement = (scrollElement: any) => {
		this.setState({ ...this.state, scrollElement });
	}

	private loadElements = ({ fillPageCount }: LoadGridElements) => {
		const newElements = [...new Array(Math.max(fillPageCount, 40)).keys()];
		this.setState({ ...this.state, dummyItems: [...this.state.dummyItems, ...newElements] });
	}

	private renderCell = ({ item, index }: { item: any, index: number }) => {
		return (
			<DummyCell item={item} index={index} />
		);
	}
}

interface State {
	scrollElement: any;
	dummyItems: any[];
}
