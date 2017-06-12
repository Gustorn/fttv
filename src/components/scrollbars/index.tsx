import React from "react";
import ReactScrollbars, { ScrollbarProps } from "react-custom-scrollbars";

export default class Scrollbars extends React.Component<OwnProps, {}> {
	render() {
		const { children, scrollRef, ...rest } = this.props;
		return (
			<ReactScrollbars ref={this.setScrollRef} {...rest}>
				{children}
			</ReactScrollbars>
		);
	}

	setScrollRef = (element: any) => {
		const { scrollRef } = this.props;
		scrollRef(element.view);
	}
}

interface OwnProps extends ScrollbarProps {
	scrollRef: (element: any) => void;
}
