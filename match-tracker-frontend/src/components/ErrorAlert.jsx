import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

export default function ErrorAlert({ error, onDismiss }) {
	if (!error) return null;
	return (
		<Alert className="mb-6 border-[--color-destructive] bg-[--color-muted]">
			<AlertDescription className="flex justify-between items-center">
				<span className="text-[--color-destructive]">{error}</span>
				<Button
					variant="ghost"
					size="sm"
					onClick={onDismiss}
					className="text-[--color-destructive] hover:text-red-800"
				>
					×
				</Button>
			</AlertDescription>
		</Alert>
	);
}
