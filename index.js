import express from "express";
import { connectDB } from "./src/config/mongo.js";
import { productRouter } from "./src/routers/productRouter.js";
import { usersRouter } from "./src/routers/usersRouter.js";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT;

const app = express();
app.use(express.json());

connectDB();

app.use("/api/products", productRouter);
app.use("/api/users", usersRouter);

app.listen(PORT, () => {
  console.log("Servidor en escucha por el puerto http://localhost:" + PORT);
});
