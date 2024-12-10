import Joi from "joi";

const movieSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  genre: Joi.array().items(Joi.string()).min(1).required(),
  director: Joi.string().min(3).max(50).required(),
  releaseYear: Joi.number()
    .integer()
    .min(1900)
    .max(new Date().getFullYear())
    .required(),
  rating: Joi.number().min(0).max(10).required(),
});

export { movieSchema };
