import { z } from "zod";

export const createMountainSchema = z.object({
  name: z.string().trim().min(1),
  state: z.string().trim().min(1),
  region: z.string().trim().optional(),
  verticalDrop: z.number().positive().optional(),
  trailCount: z.number().int().min(0).optional(),
});

export const updateMountainSchema = createMountainSchema.partial();