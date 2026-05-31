import { Request, Response } from "express";
import * as model from "../models";

export async function getAllMountainsController(req: Request, res: Response) {
  try {
    const mountains = await model.getAllMountains();

    res.status(200).json(mountains);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get mountains",
    });
  }
}

export async function getMountainByIdController(req: Request, res: Response) {
  try {
    const mountain = await model.getMountainById(req.params.id);

    if (!mountain) {
      res.status(404).json({ message: "Mountain not found" });
      return;
    }

    res.status(200).json(mountain);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get mountain",
    });
  }
}

export async function createMountainController(req: Request, res: Response) {
  try {
    const mountain = await model.createMountain(req.body);

    res.status(201).json(mountain);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to create mountain",
    });
  }
}

export async function updateMountainController(req: Request, res: Response) {
  try {
    const mountain = await model.updateMountain(req.params.id, req.body);

    if (!mountain) {
      res.status(404).json({ message: "Mountain not found" });
      return;
    }

    res.status(200).json(mountain);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to update mountain",
    });
  }
}

export async function deleteMountainController(req: Request, res: Response) {
  try {
    const mountain = await model.deleteMountain(req.params.id);

    if (!mountain) {
      res.status(404).json({ message: "Mountain not found" });
      return;
    }

    res.status(200).json({
      message: "Mountain deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to delete mountain",
    });
  }
}