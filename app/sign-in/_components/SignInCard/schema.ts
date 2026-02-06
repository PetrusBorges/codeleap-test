import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "Username is required"),
});

export type SignInSchema = z.infer<typeof signInSchema>;
