import React from "react";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators } from "redux";

import { State } from "data";
import { fetchTop } from "data/games";

import { TopGame } from "common/twitch-api/games";
import { returnOf } from "common/util";

import VirtualGrid from "components/grid";
import { GridCellProps } from "components/grid/cell";
import GameCell from "components/grid/cell/game";

import style from "./index.scss";

class Directory extends React.Component<Props, DirectoryState> {
	constructor(props: Props) {
		super(props);
		this.state = { scrollElement: window };
	}

	componentWillMount() {
		this.props.fetchTop(0, 60);
	}

	render() {
		const { topGames } = this.props;
		return (
			<div className={style.directoryContainer} ref={this.setScrollingElement}>
				<VirtualGrid
					items={topGames.top}
					targetColumnWidth={200}
					rowHeight={315}
					renderer={this.renderCell}
					scrollElement={this.state.scrollElement}
				/>
			</div>
		);
	}

	private setScrollingElement = (scrollElement: HTMLElement) => {
		this.setState({ ...this.state, scrollElement });
	}

	private renderCell = ({ item, index }: GridCellProps<TopGame>) => {
		return (
			<GameCell item={item} index={index} />
		);
	}
}

const mapStateToProps = (state: State) => ({
	topGames: state.games.topGames
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	fetchTop
}, dispatch);

type Props = typeof StateProps & typeof DispatchProps;
const StateProps = returnOf(mapStateToProps);
const DispatchProps = returnOf(mapDispatchToProps);

interface DirectoryState {
	scrollElement: any;
}

export default connect<typeof StateProps, typeof DispatchProps, {}>(
	mapStateToProps,
	mapDispatchToProps
)(Directory);
