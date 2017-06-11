import React from "react";

import Grid from "components/grid";

const dummyItems = [...Array.from(Array(1000).keys())];

export default class Directory extends React.Component<{}, {}> {
	private scrollingElement: any;

	render() {
		return (
			<div
				ref={this.setScrollingElement}
				style={{ width: "100%", overflow: "auto", padding: "0 32px" }}
			>
				<Grid cellWidth={150} items={dummyItems} rowHeight={250} scrollElement={this.scrollingElement} />
			</div>
		);
	}

	private setScrollingElement = (element: any) => {
		this.scrollingElement = element;
	}
}
