import { z } from "zod";

export const createUserSchema = z.object({
  username: z.string().trim().min(3).max(30),
  email: z.string().trim().email(),
  password: z.string().min(8).max(100),
});

export const updateUserSchema = z.object({
  username: z.string().trim().min(3).max(30).optional(),
  email: z.string().trim().email().optional(),
  password: z.string().min(8).max(100).optional(),
});