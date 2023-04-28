import { json } from "@sveltejs/kit";

export const GET = async ({ params }) => {
	const game = await fetch(
		`https://store.steampowered.com/api/appdetails?appids=${params.id}&l=french`
	).then((res) => res.json());

	return json(game[params.id]);
};
