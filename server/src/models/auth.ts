import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../db";

const JWT_SECRET = process.env.JWT_SECRET || "development_secret";

export async function loginUser(email: string, password: string) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = jwt.sign(
    {
      id: user._id,
      email: user.email,
    },
    JWT_SECRET,
    {
      expiresIn: "7d",
    },
  );

  return {
    token,
    user,
  };
}

export async function registerUser(
  username: string,
  email: string,
  password: string,
) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("Email already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  return user;
}

export async function logoutUser(userId: string) {
  return true;
}
