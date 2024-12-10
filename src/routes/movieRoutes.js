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
import validate from "../middleware/validate.js";
import { movieSchema } from "../validations/movieValidation.js";

const movieRoutes = Router();

movieRoutes.get("/", getAllMovies);
movieRoutes.get("/:id", getMovieById);
movieRoutes.post("/", validate(movieSchema), authToken, addMovie);
movieRoutes.put("/:id", validate(movieSchema), authToken, updateMovie);
movieRoutes.delete("/:id", authToken, deleteMovie);

export { movieRoutes };
