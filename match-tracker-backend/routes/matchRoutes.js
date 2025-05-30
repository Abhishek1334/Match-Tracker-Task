import express from "express";
import { getUpcomingMatches } from "../controllers/matchControllers.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Matches
 *   description: API endpoints for soccer matches
 */

/**
 * @swagger
 * /matches:
 *   get:
 *     summary: Get upcoming soccer matches within a date range
 *     tags: [Matches]
 *     parameters:
 *       - in: query
 *         name: from
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: Start date in ISO format (YYYY-MM-DD)
 *       - in: query
 *         name: to
 *         schema:
 *           type: string
 *           format: date
 *         required: false
 *         description: End date in ISO format (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: List of upcoming matches
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   competition:
 *                     type: string
 *                   matchday:
 *                     type: integer
 *                   utcDate:
 *                     type: string
 *                     format: date-time
 *                   homeTeam:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       crest:
 *                         type: string
 *                   awayTeam:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       crest:
 *                         type: string
 *       400:
 *         description: Validation error
 *       404:
 *         description: No matches found
 *       500:
 *         description: Internal server error
 */
router.get("/matches", getUpcomingMatches);

export default router;
