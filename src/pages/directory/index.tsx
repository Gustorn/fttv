import React from "react";

import Grid from "components/grid";
import Scrollbars from "components/scrollbars";

const dummyItems = [...Array.from(Array(1000).keys())];

export default class Directory extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { scrollElement: window };
	}

	render() {
		return (
			<Scrollbars scrollRef={this.setScrollingElement}>
				<div style={{ padding: "0 3em" }}>
					<Grid cellWidth={150} items={dummyItems} rowHeight={250} scrollElement={this.state.scrollElement} />
				</div>
			</Scrollbars>
		);
	}

	private setScrollingElement = (scrollElement: any) => {
		this.setState({ scrollElement });
	}
}

interface State {
	scrollElement: any;
}
