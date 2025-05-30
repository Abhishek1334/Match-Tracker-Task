import axios from "../services/axios";

/**
 * API service for match-related operations
 */
export const matchAPI = {
	/**
	 * Fetch upcoming matches from the backend
	 * @param {Object} filters - Filter parameters
	 * @param {string} filters.from - Start date in YYYY-MM-DD format
	 * @param {string} filters.to - End date in YYYY-MM-DD format
	 * @returns {Promise<Array>} Array of match objects
	 */
	async getUpcomingMatches(filters = {}) {
		try {
			// Filter out empty values
			const cleanFilters = Object.entries(filters).reduce(
				(acc, [key, value]) => {
					if (value && value.trim() !== "") {
						acc[key] = value;
					}
					return acc;
				},
				{}
			);

			const query = new URLSearchParams(cleanFilters).toString();
			const url = query ? `/api/matches?${query}` : "/api/matches";

			const response = await axios.get(url);
			return response.data;
		} catch (error) {
			// Extract error message from response or use generic message
			const message =
				error.response?.data?.message ||
				error.response?.data?.error ||
				error.message ||
				"Failed to fetch matches";

			console.error("Match API Error:", error);
			throw new Error(message);
		}
	},

	/**
	 * Get matches for today
	 * @returns {Promise<Array>} Array of today's matches
	 */
	async getTodayMatches() {
		const today = new Date().toISOString().split("T")[0];
		return this.getUpcomingMatches({ from: today, to: today });
	},

	/**
	 * Get matches for a specific date range
	 * @param {string} from - Start date in YYYY-MM-DD format
	 * @param {string} to - End date in YYYY-MM-DD format
	 * @returns {Promise<Array>} Array of matches in the date range
	 */
	async getMatchesInRange(from, to) {
		return this.getUpcomingMatches({ from, to });
	},
};

export default matchAPI;
