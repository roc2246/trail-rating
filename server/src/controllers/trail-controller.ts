import { Request, Response } from "express";
import * as model from "../models";

export async function getAllTrailsController(req: Request, res: Response) {
  try {
    const trails = await model.getAllTrails();

    res.status(200).json(trails);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get trails",
    });
  }
}

export async function getTrailByIdController(req: Request, res: Response) {
  try {
    const trail = await model.getTrailById(req.params.id);

    if (!trail) {
      res.status(404).json({ message: "Trail not found" });
      return;
    }

    res.status(200).json(trail);
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to get trail",
    });
  }
}

export async function createTrailController(req: Request, res: Response) {
  try {
    const trail = await model.createTrail(req.body);

    res.status(201).json(trail);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to create trail",
    });
  }
}

export async function updateTrailController(req: Request, res: Response) {
  try {
    const trail = await model.updateTrail(req.params.id, req.body);

    if (!trail) {
      res.status(404).json({ message: "Trail not found" });
      return;
    }

    res.status(200).json(trail);
  } catch (error) {
    res.status(400).json({
      message: error instanceof Error ? error.message : "Failed to update trail",
    });
  }
}

export async function deleteTrailController(req: Request, res: Response) {
  try {
    const trail = await model.deleteTrail(req.params.id);

    if (!trail) {
      res.status(404).json({ message: "Trail not found" });
      return;
    }

    res.status(200).json({
      message: "Trail deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error instanceof Error ? error.message : "Failed to delete trail",
    });
  }
}