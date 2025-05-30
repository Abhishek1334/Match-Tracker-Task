import { format } from "date-fns";

export default function Header({ lastFetch }) {
	return (
		<div className="mb-8">
			<h1 className="text-3xl font-bold text-center mb-2 text-[--color-foreground]">
				Upcoming Matches
			</h1>
			{lastFetch && (
				<p className="text-sm text-muted-foreground text-center">
					Last updated: {format(new Date(lastFetch), "PPpp")}
				</p>
			)}
		</div>
	);
}
