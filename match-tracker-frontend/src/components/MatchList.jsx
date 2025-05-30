import { useState, useMemo } from "react";
import MatchCard from "./MatchCard";

const MATCHES_PER_PAGE = 5;

export default function MatchList({ matches, loading }) {
	const [currentPage, setCurrentPage] = useState(1);

	const totalPages = Math.ceil(matches.length / MATCHES_PER_PAGE);

	const currentMatches = useMemo(() => {
		const startIndex = (currentPage - 1) * MATCHES_PER_PAGE;
		return matches.slice(startIndex, startIndex + MATCHES_PER_PAGE);
	}, [matches, currentPage]);

	if (!loading && matches.length === 0) {
		return (
			<div className="text-center py-8">
				<p className="text-[--color-muted-foreground] text-lg">
					No matches found.
				</p>
				<p className="text-sm text-[--color-muted-foreground] mt-2">
					Try adjusting your date filters or check back later.
				</p>
			</div>
		);
	}

	const handlePrev = () => {
		setCurrentPage((prev) => Math.max(prev - 1, 1));
	};

	const handleNext = () => {
		setCurrentPage((prev) => Math.min(prev + 1, totalPages));
	};

	return (
		<div className="space-y-4">
			{currentMatches.map((match) => (
				<MatchCard key={match.id} match={match} />
			))}

			{matches.length > 0 && (
				<div className="mt-6 text-center text-sm text-[--color-muted-foreground]">
					Showing {currentMatches.length} of {matches.length} match
					{matches.length !== 1 ? "es" : ""}
				</div>
			)}

			{totalPages > 1 && (
				<div className="flex justify-center items-center gap-4 mt-4">
					<button
						onClick={handlePrev}
						disabled={currentPage === 1}
						className="px-3 py-1 text-sm border rounded disabled:opacity-50"
					>
						Previous
					</button>
					<span className="text-sm">
						Page {currentPage} of {totalPages}
					</span>
					<button
						onClick={handleNext}
						disabled={currentPage === totalPages}
						className="px-3 py-1 text-sm border rounded disabled:opacity-50"
					>
						Next
					</button>
				</div>
			)}
		</div>
	);
}
