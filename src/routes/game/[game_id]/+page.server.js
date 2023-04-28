import { steamApi } from "$lib/steamApi.js";

export const load = async ({ params, fetch }) => {
	const game = await fetch(`/api/steam/games/${params.game_id}`).then((res) => res.json());

	const achievements = await fetch(
		`/api/steam/users/${steamApi.mySteamId}/games/${params.game_id}/achievements`
	).then((res) => res.json());

	const schema = await steamApi.request("/ISteamUserStats/GetSchemaForGame/v2", {
		appid: params.game_id
	});

	achievements.forEach((success) => {
		success.details = schema.game.availableGameStats.achievements.find(
			(a) => a.name === success.apiname
		);
	});

	game.data.achievements = achievements;

	return { game: game.data };
};
