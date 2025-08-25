import { z } from "zod";
export const postSchema = z
  .string()
  .min(20, "Post must be at least 20 characters long")
  .max(280, "Post cannot exceed 280 characters");





// ✅ usage
export const validateEmail = (email: string) => {
 return z.email("Please enter a valid email").safeParse(email);
};