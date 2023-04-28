import { steamApi } from "$lib/steamApi.js";
import { json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
	const res = await steamApi.request("/ISteamUser/GetPlayerSummaries/v0002", {
		steamIds: params.id
	});

	return json(res.players[0]);
};
