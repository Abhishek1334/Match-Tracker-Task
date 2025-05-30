import Joi from "joi";
import { fetchMatches } from "../services/fetchMatches.js";
import { createError } from "../utils/createError.js";
import {
	parseISO,
	format,
	differenceInCalendarDays,
	addDays,
	isAfter,
} from "date-fns";

/**
 * Joi schema for validating query parameters
 */
const querySchema = Joi.object({
	from: Joi.string()
		.pattern(/^\d{4}-\d{2}-\d{2}$/)
		.optional(),
	to: Joi.string()
		.pattern(/^\d{4}-\d{2}-\d{2}$/)
		.optional(),
}).and("from", "to");
// if one is present, require both

/**
 * Controller to get upcoming soccer matches within a date range.
 *
 * Validates and sanitizes query parameters `from` and `to` as ISO dates.
 * Defaults `from` to today and `to` to 5 days after today if not provided.
 * Enforces:
 *  - 'from' date cannot be later than 'to' date.
 *  - Maximum date range is 10 days.
 *
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next middleware function.
 *
 * @throws {Error} Validation error if query parameters are invalid or dates out of range.
 * @throws {Error} 404 error if no matches found.
 * @throws {Error} 500 error for internal server issues.
 *
 * @returns {void} Sends JSON array of matches in response on success.
 */
export const getUpcomingMatches = async (req, res, next) => {
	try {
		// Validate and sanitize query params
		const { error, value } = querySchema.validate(req.query, {
			abortEarly: false,
			stripUnknown: true,
		});

		if (error) {
			const message = error.details.map((d) => d.message).join(", ");
			return next(createError(400, `Validation error: ${message}`));
		}

		let { from, to } = value;

		const today = new Date();
		if (!from) from = format(today, "yyyy-MM-dd");
		if (!to) to = format(addDays(today, 5), "yyyy-MM-dd");

		from = format(parseISO(from), "yyyy-MM-dd");
		to = format(parseISO(to), "yyyy-MM-dd");

		const diffDays = differenceInCalendarDays(parseISO(to), parseISO(from));

		
		if (isAfter(parseISO(from), parseISO(to))) {
			return next(
				createError(400, "'from' date cannot be later than 'to' date.")
			);
		}

		console.log(
			`Fetching matches from ${from} to ${to} (${diffDays} days)`
		);
		console.log(`From date: ${from}, To date: ${to}`);

		if (diffDays < 0) {
			return next(
				createError(
					400,
					"The 'from' date cannot be later than the 'to' date."
				)
			);
		}

		if (diffDays > 10) {
			return next(createError(400, "The maximum number of days is 10."));
		}

		const matches = await fetchMatches(from, to);
		
		const filteredMatches = matches.filter((match) => {
			const matchDate = format(new Date(match.utcDate), "yyyy-MM-dd");
			return matchDate >= from && matchDate <= to;
		});

		if (!filteredMatches || filteredMatches.length === 0) {
			return next(createError(404, "No matches found for the given date range."));
		}

		if (!matches || matches.length === 0) {
			return next(
				createError(404, "No matches found for the given date range.")
			);
		}

		const formattedMatches = filteredMatches.map((match) => ({
			id: match.id,
			competition: match.competition.name,
			matchday: match.matchday,
			utcDate: match.utcDate,
			homeTeam: {
				name: match.homeTeam.name,
				crest: match.homeTeam.crest,
			},
			awayTeam: {
				name: match.awayTeam.name,
				crest: match.awayTeam.crest,
			},
		}));

		res.status(200).json(formattedMatches);
	} catch (err) {
		next(err);
	}
};
