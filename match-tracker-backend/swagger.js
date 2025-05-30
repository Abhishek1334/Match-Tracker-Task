import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

// Define the swagger definition (OpenAPI spec base info)
const swaggerDefinition = {
	openapi: "3.0.0",
	info: {
		title: "Soccer Matches API",
		version: "1.0.0",
		description:
			"API to fetch upcoming soccer matches between date ranges.",
	},
	servers: [
		{
			url: "http://localhost:5000/api", // Change based on your base URL
			description: "Development server",
		},
	],
};

// Options for swagger-jsdoc
const options = {
	swaggerDefinition,
	apis: [path.resolve("./routes/*.js"), path.resolve("./controllers/*.js")],
};

// Generate swagger spec
const swaggerSpec = swaggerJSDoc(options);

// Function to setup swagger docs in Express app
export const setupSwagger = (app) => {
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
