import { addDays, format } from "date-fns";
import axios from "axios";
import config from "../config/config.js";
import createError from "http-errors";

export const fetchMatches = async (from, to) => {
	const extendedTo = format(addDays(new Date(to), 1), "yyyy-MM-dd");

	try {
		const response = await axios.get(
			`https://api.football-data.org/v4/matches?dateFrom=${from}&dateTo=${extendedTo}`,
			{
				headers: {
					"X-Auth-Token": config.footballApiToken,
				},
			}
		);
		return response.data.matches;
	} catch (error) {
		console.error("Error fetching matches:", error.message);

		const message =
			error.response?.data?.message ||
			"Failed to fetch matches from external API";

		throw createError(502, message);
	}
};
