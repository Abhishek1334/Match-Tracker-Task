// utils/createError.js
export function createError(status, message) {
	const error = new Error(message);
	error.status = status;
	return error;
}
