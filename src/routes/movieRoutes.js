//Endpoints de recursos
import { Router } from "express";
import {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieController.js";
import { authToken } from "../middleware/authMiddleware.js";

const movieRoutes = Router();

movieRoutes.get("/", getAllMovies);
movieRoutes.get("/:id", getMovieById);
movieRoutes.post("/", authToken, addMovie);
movieRoutes.put("/:id", authToken, updateMovie);
movieRoutes.delete("/:id", authToken, deleteMovie);

export { movieRoutes };
