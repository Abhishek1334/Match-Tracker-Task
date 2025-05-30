// middleware/errorHandler.js
export function errorHandler(err, req, res, next) {
	const status = err.status || 500;
	const message = err.message || "Internal Server Error";
	console.error(`[${status}] ${message}`);
	res.status(status).json({
		success: false,
		status,
		message,
	});
}
