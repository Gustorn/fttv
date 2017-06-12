import React from "react";
import { ScrollbarProps } from "react-custom-scrollbars";

export default class Scrollbars extends React.Component<OwnProps, {}> {
	render() {
		const { children } = this.props;
		return (
			<div ref={this.setScrollRef} style={{ overflow: "auto", flex: "1 0 auto", width: "100%" }}>
				{children}
			</div>
		);
	}

	setScrollRef = (element: any) => {
		const { scrollRef } = this.props;
		if (scrollRef) {
			scrollRef(element);
		}
	}
}

interface OwnProps extends ScrollbarProps {
	scrollRef?: (element: any) => void;
}
