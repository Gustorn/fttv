import { TypedAction } from "data";

import { TopGames } from "./model";

export const enum ActionTypes {
	FETCH_TOP = "games/FETCH_TOP",
	SET_TOP = "games/SET_TOP"
}

export interface FetchTopAction extends TypedAction<ActionTypes.FETCH_TOP> {
	payload: {
		offset: number;
		limit: number;
	};
}

export interface SetTopAction extends TypedAction<ActionTypes.SET_TOP> {
	payload: {
		topGames: TopGames;
	};
}

export type Action =
	| FetchTopAction
	| SetTopAction;

export const fetchTop = (offset: number, limit: number): Action => ({
	type: ActionTypes.FETCH_TOP,
	payload: { offset, limit }
});

export const setTop = (topGames: TopGames): Action => ({
	type: ActionTypes.SET_TOP,
	payload: { topGames }
});
