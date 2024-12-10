import { Schema, model } from "mongoose";

const movieSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    genre: { type: [String], required: true },
    director: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    rating: { type: Number, min: 0, max: 10 },
  },
  {
    versionKey: false,
  }
);

const Movie = model("Movie", movieSchema);

const getAllMovies = async () => {
  try {
    const movies = await Movie.find();
    return movies;
  } catch (error) {
    throw new Error("Error retrieving movies from the database.");
  }
};

const getMovieById = async (id) => {
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error("Movie not found.");
    }
    return movie;
  } catch (error) {
    throw new Error("Error retrieving movie from the database.");
  }
};

const addMovie = async (dataMovie) => {
  try {
    const newMovie = new Movie(dataMovie);
    await newMovie.save();
    return newMovie;
  } catch (error) {
    throw new Error("Error creating the movie");
  }
};

const updateMovie = async (id, updateData) => {
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw new Error("Movie not found.");
    }
    Object.assign(movie, updateData);
    await movie.save();
    return movie;
  } catch (error) {
    throw new Error("Error updating the movie");
  }
};

const deleteMovie = async (id) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      throw new Error("Movie not found.");
    }

    return deletedMovie;
  } catch (error) {
    throw new Error(error.message || "Error deleting the movie");
  }
};

export default {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
