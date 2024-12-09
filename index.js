import express from "express";
import { connectDB } from "./src/config/mongo.js";
import { productRoutes } from "./src/routes/productRoutes.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
