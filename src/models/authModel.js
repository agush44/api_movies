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

const register = async (dataUser) => {
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

export { register, User };
