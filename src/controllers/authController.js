import { User, register } from "../models/authModel.js";

const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        error: "All fields (username and password) are required.",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ error: "Username is already taken." });
    }

    const newUser = await register({ username, password });

    res.status(201).json({
      message: "User registered successfully.",
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = () => {};

export { registerUser, login };
