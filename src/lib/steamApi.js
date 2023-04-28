class SteamAPI {
	#apiKey;

	mySteamId = "76561198120486845";

	/**
	 * @param {string} apiKey
	 */
	constructor(apiKey) {
		this.#apiKey = apiKey;
	}

	/**
	 * @param {string} endpoint
	 * @param {Record<string, any>} params
	 */
	async request(endpoint, params) {
		const query = new URLSearchParams({
			...params,
			key: this.#apiKey,
			l: "french",
			format: "json"
		});

		const url = `http://api.steampowered.com${endpoint}?${query}`;
		console.log(url);
		const response = await fetch(url);

		if (response.status >= 400) {
			const text = await response.text();
			throw new Error(`URL: ${url}\n\n${text}`);
		}
		const json = await response.json();

		return json.response || json;
	}
}

export const steamApi = new SteamAPI("4806948C614E87AA2BA372618756BF82");
