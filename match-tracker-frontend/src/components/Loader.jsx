export default function Loader() {
	return (
		<div className="text-center py-8">
			<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[--color-primary]"></div>
			<p className="mt-2 text-[--color-muted-foreground]">
				Loading matches...
			</p>
		</div>
	);
}
