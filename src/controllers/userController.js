import { registerUser, loginUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";

process.loadEnvFile();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUserController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "All fields (username and password) are required.",
      });
    }

    const newUser = await registerUser({ username, password });

    res.status(201).json({
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    next(error);
  }
};

const loginUserController = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "All fields (username and password) are required.",
      });
    }

    const { user, match } = await loginUser({ username, password });

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login successful.",
      token,
    });
  } catch (error) {
    next(error);
  }
};

export { registerUserController, loginUserController };
