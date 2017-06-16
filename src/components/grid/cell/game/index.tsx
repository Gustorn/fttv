import React from "react";
import { Interpolate, translate } from "react-i18next";

import { TopGame } from "common/twitch-api/games";
import { GridCellProps } from "..";
import style from "./index.scss";

@translate("games")
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
					<Interpolate i18nKey="card.viewers" value={item.viewers.toLocaleString()} />
				</div>
			</div>
		);
	}
}
