import React from "react";
import { InjectedTranslateProps, translate } from "react-i18next";
import { connect } from "react-redux";
import { Action, Dispatch, bindActionCreators } from "redux";

import { State } from "data";
import { loadNext, unload } from "data/games";

import { TopGame } from "common/twitch-api/games";
import { returnOf } from "common/util";

import InfiniteScroll from "components/infinite-scroll";

import Grid from "components/grid";
import { GridCellProps } from "components/grid/cell";
import GameCell from "components/grid/cell/game";

import style from "./index.scss";

@translate("directory")
class Directory extends React.Component<Props & InjectedTranslateProps, DirectoryState> {
	constructor(props: Props) {
		super(props);
		this.state = { scrollElement: null! };
	}

	componentWillMount() {
		this.props.loadNext(60);
	}

	componentWillUnmount() {
		this.props.unload();
	}

	render() {
		const { topGames, isLoading } = this.props;
		return (
			<div ref={this.setScrollingElement} className={style.directoryContainer}>
				<InfiniteScroll
					items={topGames.top}
					loadItems={this.loadGames}
					threshold={600}
					scrollElement={this.state.scrollElement}
					isLoading={isLoading}
				>
					{({ items, registerChild }) => (
						<Grid
							gridClass={style.gameGrid}
							items={items}
							targetColumnWidth={200}
							registerLoader={registerChild}
							cell={this.renderCell}
						/>
					)}
				</InfiniteScroll>
			</div>
		);
	}

	private loadGames = ({ elementsHint }: { elementsHint: number }) => {
		const { loadNext, isLoading } = this.props;
		const elements = elementsHint || 40;

		if (!isLoading) {
			loadNext(Math.min(elements, 100));
		}
	}

	private setScrollingElement = (scrollElement: any) => {
		this.setState({ ...this.state, scrollElement });
	}

	private renderCell = ({ item, index }: GridCellProps<TopGame>) => {
		return (
			<GameCell item={item} index={index} />
		);
	}
}

const mapStateToProps = (state: State) => ({
	topGames: state.games.topGames,
	isLoading: state.games.isLoading
});

const mapDispatchToProps = (dispatch: Dispatch<Action>) => bindActionCreators({
	loadNext,
	unload

}, dispatch);

type Props = typeof StateProps & typeof DispatchProps;
const StateProps = returnOf(mapStateToProps);
const DispatchProps = returnOf(mapDispatchToProps);

interface DirectoryState {
	scrollElement: HTMLElement;
}

export default connect<typeof StateProps, typeof DispatchProps, {}>(
	mapStateToProps,
	mapDispatchToProps
)(Directory);
