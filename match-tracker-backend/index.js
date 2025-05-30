import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import { setupSwagger } from "./swagger.js"; 
import matchRoutes from './routes/matchRoutes.js';
import { errorHandler} from './middleware/errorHandler.js';

const app = express();
const PORT = config.port || 5000;

app.use(cors());
app.use(express.json());

app.use('/api', matchRoutes);

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message || "Internal Server Error",
	});
});


app.use(errorHandler);

setupSwagger(app);

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
	console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
})