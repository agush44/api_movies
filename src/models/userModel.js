import { Schema, model } from "mongoose";
import bcryptjs from "bcryptjs";

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const User = model("User", userSchema);

const registerUser = async (dataUser) => {
  const { username, password } = dataUser;

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return null;
  }

  const alg = await bcryptjs.genSalt(10);
  const hashedPass = await bcryptjs.hash(password, alg);

  const newUser = new User({ username, password: hashedPass });
  const savedUser = await newUser.save();
  return savedUser;
};

const loginUser = async (dataUser) => {
  const { username, password } = dataUser;

  const existingUser = await User.findOne({ username });
  if (!existingUser) {
    return null;
  }

  const isMatch = await bcryptjs.compare(password, existingUser.password);
  return { user: existingUser, match: isMatch };
};

export { registerUser, loginUser };
