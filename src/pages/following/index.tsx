import React from "react";

import DummyCell from "components/grid/cell/dummy";
import Scrollbars from "components/scrollbars";

import style from "./index.scss";

const dummyItems = [...Array.from(Array(1000).keys())];

export default class Following extends React.Component<{}, State> {
	constructor(props: {}) {
		super(props);
		this.state = { container: null!, cellWidth: 150 };
	}

	componentDidMount() {
		window.addEventListener("resize", () => this.refreshSizes(), true);
	}

	render() {
		console.log(this.state);
		return (
			<Scrollbars>
				<div
					className={style.grid}
					style={{ padding: "0 3em", display: "flex" }}
				>
					<div id="grid" style={{ width: "100%", display: "flex", flexFlow: "row wrap", alignContent: "flex-start" }} ref={this.setContainerElement}>
						{dummyItems.map(item => (
							<div key={item} style={{ flex: `0 0 ${this.state.cellWidth}px`, height: "250px" }}>
								<DummyCell item={item} rowIndex={item} columnIndex={item} />
							</div>
						))}
					</div>
				</div>
			</Scrollbars>
		);
	}

	private calculateWidth = (width: number) => {
		const columnWidth = 150;
		const theoreticalColumns = width / columnWidth;

		const lessColumns = Math.floor(theoreticalColumns);
		const moreColumns = Math.ceil(theoreticalColumns);

		const idealLessColumns = lessColumns * columnWidth;
		const idealMoreColumns = moreColumns * columnWidth;

		const lessColumnsDelta = (width - idealLessColumns) / lessColumns;
		const moreColumnsDelta = (width - idealMoreColumns) / moreColumns;

		return lessColumnsDelta < -moreColumnsDelta
			? columnWidth + lessColumnsDelta - 1
			: columnWidth + moreColumnsDelta - 1;
	}

	private setContainerElement = (container: HTMLElement) => {
		const cellWidth = this.calculateWidth(container.clientWidth);
		this.setState({ container, cellWidth });
	}

	private refreshSizes = () => {
		const { container } = this.state;
		console.log(container.offsetWidth);
		const cellWidth = this.calculateWidth(container.clientWidth);
		this.setState({ container, cellWidth });
	}
}

interface State {
	container: HTMLElement;
	cellWidth: number;
}
