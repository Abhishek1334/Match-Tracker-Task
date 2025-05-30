import dotenv from 'dotenv';

dotenv.config();

export default {
	port: process.env.PORT || 5000,
	footballApiToken: process.env.FootballDataApiKey,
};