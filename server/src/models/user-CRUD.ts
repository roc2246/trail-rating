import bcrypt from "bcryptjs";
import { User } from "../db";

export async function createUser(data: any) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const userData = {
    ...data,
    password: hashedPassword,
  };

  return await User.create(userData);
}

export async function getUserById(id: string) {
  return await User.findById(id);
}

export async function getUserByEmail(email: string) {
  return await User.findOne({ email });
}

export async function updateUser(id: string, data: any) {
  const updatedData = { ...data };

  if (updatedData.password) {
    updatedData.password = await bcrypt.hash(updatedData.password, 10);
  }

  return await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });
}

export async function deleteUser(id: string) {
  return await User.findByIdAndDelete(id);
}
