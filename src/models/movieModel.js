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
    throw {
      status: 500,
      message: "Error retrieving movies from the database.",
    };
  }
};

const getMovieById = async (id) => {
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw {
        status: 404,
        message: "Movie not found.",
      };
    }
    return movie;
  } catch (error) {
    throw {
      status: 500,
      message: "Error retrieving movie from the database.",
    };
  }
};

const addMovie = async (dataMovie) => {
  try {
    const newMovie = new Movie(dataMovie);
    await newMovie.save();
    return newMovie;
  } catch (error) {
    if (error.code === 11000) {
      throw {
        status: 409,
        message: "Duplicate title: A movie with this title already exists.",
      };
    }
    throw {
      status: 500,
      message: "Error creating the movie",
    };
  }
};

const updateMovie = async (id, updateData) => {
  try {
    const movie = await Movie.findById(id);
    if (!movie) {
      throw {
        status: 404,
        message: "Movie not found.",
      };
    }
    Object.assign(movie, updateData);
    await movie.save();
    return movie;
  } catch (error) {
    console.log(error);
    throw {
      status: 500,
      message: "Error updating the movie",
    };
  }
};

const deleteMovie = async (id) => {
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);

    if (!deletedMovie) {
      throw {
        status: 404,
        message: "Movie not found.",
      };
    }

    return deletedMovie;
  } catch (error) {
    throw {
      status: 500,
      message: "Error deleting the movie",
    };
  }
};

export default {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
