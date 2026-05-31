import { z } from "zod";

export const createTrailSchema = z.object({
  name: z.string().trim().min(1),
  mountain: z.string().trim().min(1),
  difficulty: z.enum([
    "Beginner",
    "Intermediate",
    "Advanced",
    "Expert",
  ]),
  groomed: z.boolean().optional(),
  glades: z.boolean().optional(),
  terrainPark: z.boolean().optional(),
  averageRating: z.number().min(0).max(5).optional(),
});

export const updateTrailSchema = createTrailSchema.partial();