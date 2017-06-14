import { TopGame, TopGames } from "common/twitch-api/games";

export { TopGame, TopGames };

export interface State {
	topGames: TopGames;
}
