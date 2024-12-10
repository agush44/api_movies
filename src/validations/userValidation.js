import Joi from "joi";

const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(30).required().messages({
    "string.base": "Username should be a string",
    "string.empty": "Username cannot be empty",
    "string.min": "Username should have a minimum length of 3",
    "string.max": "Username should have a maximum length of 30",
    "any.required": "Username is required",
  }),
  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.empty": "Password cannot be empty",
    "string.min": "Password should have a minimum length of 6",
    "any.required": "Password is required",
  }),
});

const loginUserSchema = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username should be a string",
    "any.required": "Username is required",
  }),
  password: Joi.string().required().messages({
    "string.base": "Password should be a string",
    "any.required": "Password is required",
  }),
});

export { registerUserSchema, loginUserSchema };
