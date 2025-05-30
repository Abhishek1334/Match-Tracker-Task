import { useEffect, useState } from "react";
import useMatchStore from "../store/matchStore";
import Header from "@/components/Header";
import FiltersPanel from "@/components/FiltersPanel";
import ErrorAlert from "@/components/ErrorAlert";
import Loader from "@/components/Loader";
import MatchList from "@/components/MatchList";

export default function Home() {
	const matches = useMatchStore((s) => s.matches);
	const filters = useMatchStore((s) => s.filters);
	const loading = useMatchStore((s) => s.loading);
	const error = useMatchStore((s) => s.error);
	const lastFetch = useMatchStore((s) => s.lastFetch);

	const setFilters = useMatchStore((s) => s.setFilters);
	const fetchMatches = useMatchStore((s) => s.fetchMatches);
	const applyFilters = useMatchStore((s) => s.applyFilters);
	const clearFilters = useMatchStore((s) => s.clearFilters);
	const clearError = useMatchStore((s) => s.clearError);
	const fetchTodayMatches = useMatchStore((s) => s.fetchTodayMatches);
	const fetchWeekMatches = useMatchStore((s) => s.fetchWeekMatches);
	const isDataStale = useMatchStore((s) => s.isDataStale);
	const refreshMatches = useMatchStore((s) => s.refreshMatches);

	const [autoRefresh, setAutoRefresh] = useState(false);

	useEffect(() => {
		fetchMatches();
	}, [fetchMatches]);

	useEffect(() => {
		if (!autoRefresh) return;
		const interval = setInterval(() => {
			if (isDataStale()) refreshMatches();
		}, 60000);
		return () => clearInterval(interval);
	}, [autoRefresh, isDataStale, refreshMatches]);

	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		setFilters({ [name]: value });
	};

	const handleApplyFilters = () => applyFilters();
	const handleClearFilters = () => {
		clearFilters();
		fetchMatches();
	};

	return (
		<div className="container mx-auto p-6 max-w-4xl">
			<Header lastFetch={lastFetch} />
			<FiltersPanel
				filters={filters}
				loading={loading}
				handleFilterChange={handleFilterChange}
				handleApplyFilters={handleApplyFilters}
				handleClearFilters={handleClearFilters}
				handleTodayFilter={fetchTodayMatches}
				handleWeekFilter={fetchWeekMatches}
				autoRefresh={autoRefresh}
				setAutoRefresh={setAutoRefresh}
			/>
			<ErrorAlert error={error} onDismiss={clearError} />
			{loading ? (
				<Loader />
			) : (
				<MatchList matches={matches} loading={loading} />
			)}
		</div>
	);
}
