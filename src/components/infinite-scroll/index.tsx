import React from "react";

export default class InfiniteScroll extends React.PureComponent<OwnProps, {}> {
	private scrollTicking = false;

	componentDidMount() {
		this.props.scrollElement.addEventListener("scroll", this.handleScroll, true);
	}

	componentWillUnmount() {
		this.props.scrollElement.removeEventListener("scroll", this.handleScroll);
	}

	render() {
		const { children, scrollElement, loadThreshold, loadElements, elementRef, ...rest } = this.props;
		return (
			<div ref={elementRef} {...rest}>
				{children}
			</div>
		);
	}

	private handleScroll = () => {
		const { scrollElement, loadThreshold, loadElements } = this.props;
		const scrollTop = scrollElement.scrollTop;
		if (!this.scrollTicking) {
			requestAnimationFrame(() => {
				const scrollHeight = scrollElement.scrollHeight;
				const offsetHeight = scrollElement.offsetHeight;
				if ((scrollTop + offsetHeight) > (scrollHeight - loadThreshold)) {
					loadElements();
				}
				this.scrollTicking = false;
			});
		}
		this.scrollTicking = true;
	}
}

interface OwnProps extends React.HTMLProps<HTMLDivElement> {
	scrollElement: HTMLElement;
	loadThreshold: number;
	elementRef: (element: HTMLElement) => void;
	loadElements: () => void;
}
