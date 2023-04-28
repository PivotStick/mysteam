import { steamApi } from "$lib/steamApi.js";

export const load = async ({ fetch }) => {
	const user = await fetch(`/api/steam/users/${steamApi.mySteamId}`).then((res) => res.json());
	user.games = await fetch(`/api/steam/users/${steamApi.mySteamId}/games`).then((res) =>
		res.json()
	);

	return { user };
};
