import Movie from "../models/movieModel.js";

const getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.getAllMovies();
    res.status(200).json(movies);
  } catch (error) {
    next(error);
  }
};

const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.getMovieById(id);

    if (!movie) {
      return res.status(400).json({ error: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req, res, next) => {
  const { title, genre, director, releaseYear, rating } = req.body;
  try {
    if (!title || !genre || !director || !releaseYear || !rating) {
      return res.status(400).json({
        status: 400,
        error:
          "All fields (title, genre, director, releaseYear, rating) are required.",
      });
    }

    const newMovie = await Movie.addMovie({
      title,
      genre,
      director,
      releaseYear,
      rating,
    });

    if (!newMovie) {
      return res.status(400).json({
        status: 400,
        error: "Failed to create movie. Please try again.",
      });
    }

    res.status(201).json(newMovie);
  } catch (error) {
    next(error);
  }
};

const updateMovie = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedMovie = await Movie.updateMovie(id, updateData);

    if (!updatedMovie) {
      return res.status(404).json({
        status: 400,
        error: "Movie not found.",
      });
    }

    res.status(200).json({
      message: "Movie updated successfully.",
      movie: updatedMovie,
    });
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        status: 400,
        error: "Movie ID is required.",
      });
    }

    const deletedMovie = await Movie.deleteMovie(id);

    if (!deletedMovie) {
      return res.status(404).json({
        status: 400,
        error: "Movie not found.",
      });
    }

    res.status(200).json({ message: "Movie successfully deleted." });
  } catch (error) {
    next(error);
  }
};

export { getAllMovies, getMovieById, addMovie, updateMovie, deleteMovie };
