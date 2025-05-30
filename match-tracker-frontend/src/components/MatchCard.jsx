import { format } from "date-fns";

export default function MatchCard({ match }) {
	return (
		<div className="bg-[--color-card] rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
			<div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex-1">
					<div className="flex items-center gap-4 mb-2">
						{match.homeTeam.crest && (
							<img
								src={match.homeTeam.crest}
								alt={`${match.homeTeam.name} logo`}
								className="w-8 h-8 object-contain"
							/>
						)}
						<h3 className="text-xl font-semibold text-[--color-foreground]">
							{match.homeTeam.name} vs {match.awayTeam.name}
						</h3>
						{match.awayTeam.crest && (
							<img
								src={match.awayTeam.crest}
								alt={`${match.awayTeam.name} logo`}
								className="w-8 h-8 object-contain"
							/>
						)}
					</div>
					<div className="text-sm text-[--color-muted-foreground] space-y-1">
						<p>
							<strong>Competition:</strong> {match.competition}
						</p>
						{match.matchday && (
							<p>
								<strong>Matchday:</strong> {match.matchday}
							</p>
						)}
					</div>
				</div>
				<div className="text-right">
					<p className="text-lg font-medium text-[--color-primary]">
						{format(new Date(match.utcDate), "PPpp")}
					</p>
					<p className="text-sm text-[--color-muted-foreground]">
						UTC Time
					</p>
				</div>
			</div>
		</div>
	);
}


