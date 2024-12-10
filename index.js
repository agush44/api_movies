import express from "express";
import helmet from "helmet";
import { connectDB } from "./src/config/mongo.js";
import { movieRoutes } from "./src/routes/movieRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import errorMiddleware from "./src/middleware/errorMiddleware.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";

process.loadEnvFile();

const PORT = process.env.PORT;

const app = express();

const swaggerDocument = YAML.load("./swagger.yaml");
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(helmet());
app.use(express.json());

connectDB();

app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
