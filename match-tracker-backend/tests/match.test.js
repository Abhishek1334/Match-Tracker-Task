import { jest } from "@jest/globals";
import request from "supertest";
import express from "express";

// 1. Create the mock function
const fetchMatchesMock = jest.fn();

// 2. Mock fetchMatches module before importing route that uses it
await jest.unstable_mockModule("../services/fetchMatches.js", () => ({
	fetchMatches: fetchMatchesMock,
}));

// 3. Import routes after mocking is set up
const { default: matchRoutes } = await import("../routes/matchRoutes.js");

// 4. Setup express app with JSON parsing and routes
const app = express();
app.use(express.json());
app.use("/api", matchRoutes);

// 5. Generic error handler middleware to normalize 500 error messages
app.use((err, req, res, next) => {
	const statusCode = err.status || 500;

	res.status(statusCode).json({
		message:
			statusCode >= 500
				? "Internal server error"
				: err.message || "Internal server error",
	});
});


describe("GET /api/matches", () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	it("should return 200 and matches with default dates", async () => {
		fetchMatchesMock.mockResolvedValueOnce([
			{
				id: 1,
				competition: { name: "Premier League" },
				matchday: 12,
				utcDate: "2025-06-01T15:00:00Z",
				homeTeam: { name: "Team A", crest: "http://crest-a.png" },
				awayTeam: { name: "Team B", crest: "http://crest-b.png" },
			},
		]);

		const res = await request(app).get("/api/matches");

		expect(res.statusCode).toBe(200);
		expect(Array.isArray(res.body)).toBe(true);
		expect(res.body.length).toBe(1);
		expect(res.body[0]).toMatchObject({
			id: 1,
			competition: "Premier League",
			matchday: 12,
			utcDate: "2025-06-01T15:00:00Z",
			homeTeam: { name: "Team A", crest: "http://crest-a.png" },
			awayTeam: { name: "Team B", crest: "http://crest-b.png" },
		});
	});

	it("should accept valid 'from' and 'to' query params", async () => {
		const from = "2025-05-01";
		const to = "2025-05-05";

		fetchMatchesMock.mockResolvedValueOnce([]);

		await request(app).get(`/api/matches?from=${from}&to=${to}`);

		// Assert the mock is called with Date objects (as your route likely converts strings to Dates)
		expect(fetchMatchesMock).toHaveBeenCalledWith(
			new Date(from),
			new Date(to)
		);
	});

	it("should return 400 for invalid date formats", async () => {
		const res = await request(app).get(
			"/api/matches?from=invalid-date&to=2025-05-05"
		);
		expect(res.statusCode).toBe(400);
		expect(res.body.message || "").toMatch(/validation error/i);
	});

	it("should return 400 if only 'from' or 'to' is provided", async () => {
		let res = await request(app).get("/api/matches?from=2025-05-01");
		expect(res.statusCode).toBe(400);
		expect(res.body.message || "").toMatch(/validation error/i);

		res = await request(app).get("/api/matches?to=2025-05-05");
		expect(res.statusCode).toBe(400);
		expect(res.body.message || "").toMatch(/validation error/i);
	});

	it("should return 400 if 'from' date is after 'to' date", async () => {
		const res = await request(app).get(
			"/api/matches?from=2025-06-10&to=2025-06-01"
		);
		expect(res.statusCode).toBe(400);
		expect(res.body.message || "").toMatch(/cannot be later than/i);
	});

	it("should return 400 if date range is greater than 10 days", async () => {
		const res = await request(app).get(
			"/api/matches?from=2025-06-01&to=2025-06-20"
		);
		expect(res.statusCode).toBe(400);
		expect(res.body.message || "").toMatch(/maximum number of days is 10/i);
	});

	it("should return 404 if no matches found", async () => {
		fetchMatchesMock.mockResolvedValueOnce([]);

		const res = await request(app).get(
			"/api/matches?from=2025-06-01&to=2025-06-05"
		);

		expect(res.statusCode).toBe(404);
		expect(res.body.message || "").toMatch(/no matches found/i);
	});

	it("should handle internal server errors", async () => {
		fetchMatchesMock.mockRejectedValueOnce(new Error("Unexpected Error"));

		const res = await request(app).get("/api/matches");

		expect(res.statusCode).toBe(500);
		expect(res.body.message || "").toMatch(/internal server error/i);
	});
});
