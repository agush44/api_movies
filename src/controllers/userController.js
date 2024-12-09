import { registerUser, loginUser } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const registerUserController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "All fields (username and password) are required.",
      });
    }

    const newUser = await registerUser({ username, password });

    if (!newUser) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    res.status(201).json({
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const loginUserController = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "All fields (username and password) are required.",
      });
    }

    const { user, match } = await loginUser({ username, password });

    if (!user) {
      return res.status(404).json({ error: "The user is not registered." });
    }

    if (!match) {
      return res.status(401).json({ error: "Invalid password." });
    }

    const token = jwt.sign({ username: user.username }, JWT_SECRET, {
      expiresIn: "3m",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export { registerUserController, loginUserController };
