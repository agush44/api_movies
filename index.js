import express from "express";
import { connectDB } from "./src/config/mongo.js";
import { productRoutes } from "./src/routes/productRoutes.js";
import { usersRoutes } from "./src/routes/usersRoutes.js";
import { authRoutes } from "./src/routes/authRoutes.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

connectDB();

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
