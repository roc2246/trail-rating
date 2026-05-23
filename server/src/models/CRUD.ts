import { Mountain, Trail } from "../db";

export async function getAllMountains() {
  return await Mountain.find();
}

export async function getMountainById(id: string) {
  return await Mountain.findById(id);
}

export async function createMountain(data: object) {
  return await Mountain.create(data);
}

export async function updateMountain(id: string, data: object) {
  return await Mountain.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
}

export async function deleteMountain(id: string) {
  return await Mountain.findByIdAndDelete(id);
}

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