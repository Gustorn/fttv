import React from "react";

import { LoadGridElements } from "./common";
import GridContent from "./content";

export default class Grid extends React.Component<OwnProps, {}> {
	private resizeTicking = false;

	private previousContainer: HTMLElement | null = null;
	private container: HTMLElement;

	constructor(props: OwnProps) {
		super(props);
	}

	componentDidMount() {
		window.addEventListener("resize", this.handleResize, true);
	}

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	componentDidUpdate() {
		if (!this.previousContainer && this.container) {
			this.previousContainer = this.container;
			this.forceUpdate();
		}
	}

	render() {
		const { items, columnWidth, cellRenderer, rowHeight, scrollElement, loadElements, loadThreshold } = this.props;
		return (
			<div ref={this.setContainer} style={{ width: "100%", height: "100%" }}>
				{!!this.container && <GridContent
					container={this.container}
					fullWidth={this.container.offsetWidth}
					fullHeight={this.container.offsetHeight}
					scrollElement={scrollElement}
					loadElements={loadElements}
					loadThreshold={loadThreshold}
					items={items}
					rowHeight={rowHeight}
					columnWidth={columnWidth}
					cellRenderer={cellRenderer}
				/>}
			</div>
		);
	}

	private handleResize = () => {
		if (!this.resizeTicking) {
			requestAnimationFrame(() => {
				this.forceUpdate();
				this.resizeTicking = false;
			});
		}
		this.resizeTicking = true;
	}

	private setContainer = (container: HTMLElement) => {
		this.container = container;
	}
}

export interface OwnProps {
	scrollElement: HTMLElement;

	items: any[];
	rowHeight: number;
	columnWidth: number;

	loadThreshold: number;
	loadElements: (params: LoadGridElements) => void;
	cellRenderer: (props: { item: any, index: number }) => JSX.Element;
}

export * from "./common";
