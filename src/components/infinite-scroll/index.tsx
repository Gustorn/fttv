import React from "react";

import resizeDetector, { Listener } from "common/resize-detector";

const wrapperStyle = { width: "100%", height: "100%" };

interface State {
	wrapper: HTMLElement;
}

export default class InfiniteScroll extends React.PureComponent<OwnProps, State> {
	private child: HTMLElement | undefined;
	private childHeight: number | undefined;
	private wrapper: HTMLElement | undefined;

	private previousScroller: HTMLElement | undefined;

	private visibleScrollArea: number | undefined;

	private scrollTicking = false;
	private isDirty = false;

	static defaultProps: Partial<OwnProps> = {
		threshold: 250
	};

	componentDidMount() {
		this.registerScrollListeners(this.props);
	}

	componentWillReceiveProps(nextProps: OwnProps) {
		if (this.props.items !== nextProps.items || this.props.isLoading !== nextProps.isLoading) {
			this.isDirty = false;
		}
		this.registerScrollListeners(nextProps);
	}

	componentWillUnmount() {
		this.clearComponent();
	}

	render() {
		const { children, items, scrollElement } = this.props;
		if (!scrollElement) {
			return null;
		}

		return (
			<div ref={this.registerWrapper} style={wrapperStyle}>
				{children({ items: items!, registerChild: this.registerChild })}
			</div>
		);
	}

	private handleResize: Listener = e => {
		if (this.childHeight === e.clientHeight) {
			return;
		}

		this.childHeight = e.clientHeight;
		this.fillPage(this.childHeight, this.wrapper && this.wrapper.scrollHeight);
	}

	private handleScroll = (event: Event) => {
		if (this.isDirty || this.scrollTicking || !this.child ||
			!this.wrapper || !this.visibleScrollArea) {
			return;
		}

		requestAnimationFrame(() => {
			const scroller = event.target as HTMLElement;
			const { scrollTop, scrollHeight } = scroller;
			const { loadItems, threshold } = this.props;
			if ((scrollTop + this.visibleScrollArea! + threshold! > scrollHeight) && !this.isDirty) {
				this.isDirty = true;
				loadItems({});
			}
			this.scrollTicking = false;
		});
		this.scrollTicking = true;
	}

	private fillPage = (childHeight: number | undefined, wrapperHeight: number | undefined) => {
		if (this.isDirty || !childHeight || !wrapperHeight) {
			return;
		}

		if (childHeight < wrapperHeight) {
			this.isDirty = true;

			const { items, loadItems } = this.props;
			const itemsPerHeight = Math.ceil(items.length / childHeight);
			const additionalItems = Math.ceil(itemsPerHeight * (wrapperHeight - childHeight));
			loadItems({ elementsHint: additionalItems });
		}
	}

	private registerWrapper = (element: HTMLElement) => {
		if (this.wrapper === element) {
			return;
		}
		this.wrapper = element;
	}

	private registerChild = (element: HTMLElement) => {
		if (this.child === element) {
			return;
		}

		if (this.child) {
			resizeDetector.removeListener(this.child, this.handleResize);
		}

		if (element) {
			resizeDetector.listenTo(element, this.handleResize);
			this.child = element;
		}
	}

	private registerScrollListeners = (nextProps: OwnProps) => {
		const { previousScroller  } = this;
		const { scrollElement: nextScroller } = nextProps;

		if (previousScroller === nextScroller) {
			return;
		}

		if (previousScroller) {
			resizeDetector.removeListener(previousScroller, this.setVisibleScrollArea);
			previousScroller.removeEventListener("scroll", this.handleScroll);
			previousScroller.removeEventListener("touchmove", this.handleScroll);
		}

		if (nextScroller) {
			this.previousScroller = nextScroller;
			resizeDetector.listenTo(nextScroller, this.setVisibleScrollArea);
			nextScroller.addEventListener("scroll", this.handleScroll, true);
			nextScroller.addEventListener("touchmove", this.handleScroll, true);
		}
	}

	private clearComponent = () => {
		this.child = undefined;
		this.childHeight = undefined;
		this.wrapper = undefined;
		this.previousScroller = undefined;
		this.visibleScrollArea  = undefined;

		this.scrollTicking = false;
		this.isDirty = false;

		if (this.child) {
			resizeDetector.uninstall(this.child);
		}

		if (this.wrapper) {
			resizeDetector.uninstall(this.wrapper);
		}

		if (this.props.scrollElement) {
			resizeDetector.uninstall(this.props.scrollElement);
			this.props.scrollElement.removeEventListener("scroll", this.handleScroll);
			this.props.scrollElement.removeEventListener("touchmove", this.handleScroll);
		}
	}

	private setVisibleScrollArea = (element: HTMLElement) => {
		this.visibleScrollArea = element.offsetHeight;
	}
}

interface OwnProps {
	children: (props: { items: any[], registerChild: (element: HTMLElement) => void }) => React.ReactNode;
	items: any[];
	isLoading: boolean;
	loadItems: (props: { elementsHint?: number }) => void;
	scrollElement: HTMLElement;
	threshold?: number;
}
