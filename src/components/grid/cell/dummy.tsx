import React from "react";

export default class DummyCell extends React.PureComponent<OwnProps, {}> {
	render() {
		const { rowIndex, columnIndex } = this.props;
		return (
			<div
				style={{
					height: "100%",
					display: "flex",
					flexFlow: "column nowrap",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<div
					style={{
						background: "url(https://static-cdn.jtvnw.net/ttv-boxart/Casino-272x380.jpg) center no-repeat",
						width: "90%",
						flex: "1 1 auto"
					}}
				/>
				<div>({rowIndex}, {columnIndex})</div>
			</div>
		);
	}
}

interface OwnProps {
	item: any;
	rowIndex: number;
	columnIndex: number;
}
