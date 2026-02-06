import { z } from "zod";

export const editPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z
    .string()
    .min(1, "Content is required")
    .max(100, "Content must be less than 100 characters"),
});

export type EditPostSchema = z.infer<typeof editPostSchema>;
