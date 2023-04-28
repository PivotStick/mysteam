import { steamApi } from "$lib/steamApi.js";
import { json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
	try {
		const res = await steamApi.request("/ISteamUserStats/GetPlayerAchievements/v1", {
			steamid: params.id,
			appid: params.game_id
		});

		return json(res.playerstats.achievements);
	} catch (error) {
		return json([]);
	}
};
