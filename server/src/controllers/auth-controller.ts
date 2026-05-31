import { Request, Response } from "express";
import * as model from "../models";

export async function loginController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const result = await model.loginUser(email, password);

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Login failed",
    });
  }
}

export async function registerController(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body;

    const user = await model.registerUser(username, email, password);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Registration failed",
    });
  }
}

export async function logoutController(req: Request, res: Response) {
  try {
    const { userId } = req.body;

    await model.logoutUser(userId);

    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Logout failed",
    });
  }
}