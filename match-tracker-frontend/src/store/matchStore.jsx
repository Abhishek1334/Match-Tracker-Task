import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import matchAPI from "@/api/match"

const useMatchStore = create(
	subscribeWithSelector((set, get) => ({
		// State
		matches: [],
		loading: false,
		error: null,
		filters: {
			from: "",
			to: "",
		},
		lastFetch: null,

		// Actions
		setFilters: (newFilters) => {
			set((state) => ({
				filters: { ...state.filters, ...newFilters },
			}));
		},

		clearFilters: () => {
			set({
				filters: { from: "", to: "" },
			});
		},

		setLoading: (loading) => set({ loading }),

		setError: (error) => set({ error }),

		clearError: () => set({ error: null }),

		setMatches: (matches) =>
			set({
				matches,
				lastFetch: new Date().toISOString(),
			}),

		// Main fetch function
		fetchMatches: async (customFilters = null) => {
			const state = get();
			const filtersToUse = customFilters || state.filters;

			set({ loading: true, error: null });
			console.log("Fetching matches with filters:", filtersToUse);
			try {
				const matches = await matchAPI.getUpcomingMatches(filtersToUse);

				set({
					matches,
					loading: false,
					error: null,
					lastFetch: new Date().toISOString(),
				});

				return matches;
			} catch (error) {
				const errorMessage = error.message || "Failed to fetch matches";

				set({
					error: errorMessage,
					loading: false,
					matches: [], // Clear matches on error
				});

				throw error;
			}
		},

		// Convenience methods
		fetchTodayMatches: async () => {
			const today = new Date().toISOString().split("T")[0];
			return get().fetchMatches({ from: today, to: today });
		},

		fetchWeekMatches: async () => {
			const today = new Date();
			const nextWeek = new Date(today);
			nextWeek.setDate(today.getDate() + 7);

			return get().fetchMatches({
				from: today.toISOString().split("T")[0],
				to: nextWeek.toISOString().split("T")[0],
			});
		},

		// Refresh matches (re-fetch with current filters)
		refreshMatches: async () => {
			const { filters } = get();
			return get().fetchMatches(filters);
		},

		// Apply current filters and fetch
		applyFilters: async () => {
			const { filters } = get();
			return get().fetchMatches(filters);
		},

		// Reset store to initial state
		reset: () => {
			set({
				matches: [],
				loading: false,
				error: null,
				filters: { from: "", to: "" },
				lastFetch: null,
			});
		},

		// Get formatted matches (add any client-side formatting here)
		getFormattedMatches: () => {
			const { matches } = get();
			return matches.map((match) => ({
				...match,
				formattedDate: new Date(match.utcDate).toLocaleDateString(),
				formattedTime: new Date(match.utcDate).toLocaleTimeString(),
			}));
		},

		// Check if data is stale (older than 5 minutes)
		isDataStale: () => {
			const { lastFetch } = get();
			if (!lastFetch) return true;

			const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
			return new Date(lastFetch) < fiveMinutesAgo;
		},
	}))
);

export default useMatchStore;
