import { Request, Response } from "express";
import * as model from "../models";

export async function createUserController(req: Request, res: Response) {
  try {
    const user = await model.createUser(req.body);

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to create user",
    });
  }
}

export async function getUserByIdController(req: Request, res: Response) {
  try {
    const user = await model.getUserById(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get user",
    });
  }
}

export async function getUserByEmailController(req: Request, res: Response) {
  try {
    const user = await model.getUserByEmail(req.params.email);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get user",
    });
  }
}

export async function updateUserController(req: Request, res: Response) {
  try {
    const user = await model.updateUser(req.params.id, req.body);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to update user",
    });
  }
}

export async function deleteUserController(req: Request, res: Response) {
  try {
    const user = await model.deleteUser(req.params.id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({
      message: "User deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to delete user",
    });
  }
}