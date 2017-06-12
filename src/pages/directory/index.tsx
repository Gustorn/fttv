import React from "react";

import Grid from "components/grid";

const dummyItems = [...Array.from(Array(1000).keys())];

export default class Directory extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { scrollElement: window };
	}

	render() {
		return (
			<div
				ref={this.setScrollingElement}
				style={{ width: "100%", overflow: "auto", padding: "0 3em" }}
			>
				<Grid cellWidth={150} items={dummyItems} rowHeight={250} scrollElement={this.state.scrollElement} />
			</div>
		);
	}

	private setScrollingElement = (scrollElement: any) => {
		this.setState({ scrollElement });
	}
}

interface State {
	scrollElement: any;
}
