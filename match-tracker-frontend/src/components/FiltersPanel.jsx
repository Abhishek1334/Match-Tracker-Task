import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function FiltersPanel({
	filters,
	loading,
	handleFilterChange,
	handleApplyFilters,
	handleClearFilters,
	handleTodayFilter,
	handleWeekFilter,
	autoRefresh,
	setAutoRefresh,
}) {
	return (
		<div className="bg-[--color-card] rounded-lg shadow-md p-6 mb-6">
			<h2 className="text-lg font-semibold mb-4 text-[--color-foreground]">
				Filter Matches
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
				<div>
					<label
						htmlFor="from"
						className="block text-sm font-medium text-[--color-foreground] mb-1"
					>
						From Date
					</label>
					<Input
						type="date"
						id="from"
						name="from"
						value={filters.from}
						onChange={handleFilterChange}
						className="w-full"
					/>
				</div>
				<div>
					<label
						htmlFor="to"
						className="block text-sm font-medium text-[--color-foreground] mb-1"
					>
						To Date
					</label>
					<Input
						type="date"
						id="to"
						name="to"
						value={filters.to}
						onChange={handleFilterChange}
						className="w-full"
					/>
				</div>
			</div>

			<div className="flex flex-wrap gap-2 mb-4">
				<Button onClick={handleApplyFilters} disabled={loading}>
					Apply Filters
				</Button>
				<Button
					variant="outline"
					onClick={handleClearFilters}
					disabled={loading}
				>
					Clear Filters
				</Button>
				<Button
					variant="outline"
					onClick={handleTodayFilter}
					disabled={loading}
				>
					Today's Matches
				</Button>
				<Button
					variant="outline"
					onClick={handleWeekFilter}
					disabled={loading}
				>
					Next 7 Days
				</Button>
			</div>

			<div className="flex items-center gap-2">
				<input
					type="checkbox"
					id="autoRefresh"
					checked={autoRefresh}
					onChange={(e) => setAutoRefresh(e.target.checked)}
					className="rounded"
				/>
				<label
					htmlFor="autoRefresh"
					className="text-sm text-[--color-muted-foreground]"
				>
					Auto-refresh every minute
				</label>
			</div>
		</div>
	);
}
