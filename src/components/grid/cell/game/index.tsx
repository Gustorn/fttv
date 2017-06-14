import React from "react";

import { TopGame } from "common/twitch-api/games";
import { GridCellProps } from "..";
import style from "./index.scss";

export default class DummyCell extends React.PureComponent<GridCellProps<TopGame>, {}> {
	render() {
		const { item } = this.props;
		return (
			<div className={style.gameCell}>
				<div
					className={style.gameCellBackground}
					style={{ backgroundImage: `url(${item.game.box.large})` }}
				/>
				<div className={style.gameCellTitle}>
					{item.game.name}
				</div>
				<div className={style.gameCellViewers}>
					{item.viewers} viewers
				</div>
			</div>
		);
	}
}
