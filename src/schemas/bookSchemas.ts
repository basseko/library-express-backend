import { z } from "zod";

export const addBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  genre: z.string().min(1, "Genre is required"),
  year: z
    .number()
    .min(1000, "Year must be a valid number")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
});

export const searchBooksSchema = z.object({
  title: z.string().optional(),
  author: z.string().optional(),
});

export const bookIdParamSchema = z.object({
  id: z.string().uuid("Invalid book ID format"),
});
