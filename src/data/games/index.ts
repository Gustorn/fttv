import { ActionsObservable } from "redux-observable";

import { getTopGames } from "common/twitch-api/games";

import { Action, ActionTypes, FetchTopAction, setTop } from "./actions";
import { State } from "./model";

export const initialState: State = {
	topGames: { _total: 0, top: [] }
};

export const reducer = (state = initialState, action: Action): State => {
	switch (action.type) {
		case ActionTypes.SET_TOP: {
			return { ...state, topGames: action.payload.topGames };
		}

		default: return state;
	}
};

export const epic = (actions$: ActionsObservable<FetchTopAction>) => actions$
	.ofType(ActionTypes.FETCH_TOP)
	.switchMap(action => {
		return getTopGames(action.payload)
			.map(topGames => setTop(topGames));
	});

export * from "./actions";
export * from "./model";
