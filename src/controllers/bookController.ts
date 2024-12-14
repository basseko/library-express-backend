import { Request, Response } from "express";
import * as bookService from "../services/bookService";

export const addBook = async (req: Request, res: Response) => {
  try {
    const book = await bookService.addBook(req.body);
    res.status(201).json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const searchBooks = async (req: Request, res: Response) => {
  try {
    const books = await bookService.searchBooks(req.query);
    res.status(200).json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getBookDetails = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const book = await bookService.getBookDetails(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateBook = async (req: Request, res: Response) => {
  try {
    const updatedBook = await bookService.updateBook(req.params.id, req.body);
    if (!updatedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json(updatedBook);
  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};

export const deleteBook = async (req: Request, res: Response) => {
  try {
    const deletedBook = await bookService.deleteBook(req.params.id);
    if (!deletedBook) {
      res.status(404).json({ message: "Book not found" });
      return;
    }
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error: unknown) {
    res.status(500).json({
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
    });
  }
};
