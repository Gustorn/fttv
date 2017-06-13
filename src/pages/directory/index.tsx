import React from "react";

import Grid, { LoadGridElements } from "components/grid";
import DummyCell from "components/grid/cell/dummy";

const dummyItems = [...Array.from(Array(60).keys())];

export default class Directory extends React.Component<{}, State> {
	private memoizedLoads: { [key: number]: boolean } = {};

	constructor(props: {}) {
		super(props);
		this.state = { scrollElement: window, dummyItems };
	}

	render() {
		return (
			<div ref={this.setScrollingElement} style={{ overflow: "auto", width: "100%" }}>
				<div style={{ padding: "0 3em", height: "100%" }}>
					{this.state.scrollElement && <Grid
						scrollElement={this.state.scrollElement}
						rowHeight={250}
						columnWidth={150}
						cellRenderer={this.renderCell}
						loadElements={this.loadElements}
						loadThreshold={250}
						items={this.state.dummyItems}
					/>}
				</div>
			</div>
		);
	}

	private setScrollingElement = (scrollElement: any) => {
		this.setState({ ...this.state, scrollElement });
	}

	private loadElements = ({ startIndex, fillPageCount }: LoadGridElements) => {
		if (!this.memoizedLoads[startIndex]) {
			this.memoizedLoads[startIndex] = true;
			setTimeout(() => {
				const newElements = [...new Array(Math.max(fillPageCount, 40)).keys()];
				this.setState({ ...this.state, dummyItems: [...this.state.dummyItems, ...newElements] });
			}, 0);
		}
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
