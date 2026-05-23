import {Trail } from "../db";

export async function getAllTrails() {
  return await Trail.find();
}

export async function getTrailById(id: string) {
  return await Trail.findById(id);
}

export async function createTrail(data: object) {
  return await Trail.create(data);
}

export async function updateTrail(id: string, data: object) {
  return await Trail.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteTrail(id: string) {
  return await Trail.findByIdAndDelete(id);
}