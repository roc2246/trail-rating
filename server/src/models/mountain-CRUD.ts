import { Mountain } from "../db";

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

