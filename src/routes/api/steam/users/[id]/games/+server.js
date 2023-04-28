import { steamApi } from "$lib/steamApi.js";
import { json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
	const res = await steamApi.request("/IPlayerService/GetOwnedGames/v0001/", {
		steamid: params.id
	});

	if (res.games) {
		res.games.forEach((game) => {
			game.cover = `https://cdn.akamai.steamstatic.com/steam/apps/${game.appid}/header.jpg`;
		});
	}

	return json(res.games || []);
};
