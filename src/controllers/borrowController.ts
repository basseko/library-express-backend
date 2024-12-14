import { Request, Response } from "express";

import * as borrowService from "../services/borrowService";

export const borrowBook = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const bookId = req.params.id;

    if (!userId) {
      res.status(400).json({ message: "User must be authenticated" });
      return;
    }
    if (!bookId) {
      res.status(400).json({ message: "Book ID is required" });
      return;
    }

    const borrow = await borrowService.borrowBook({ userId, bookId });

    res.status(201).json(borrow);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const returnBook = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const bookId = req.params.id;

    if (!userId) {
      res.status(400).json({ message: "User must be authenticated" });
      return;
    }
    if (!bookId) {
      res.status(400).json({ message: "Book ID is required" });
      return;
    }

    const borrow = await borrowService.returnBook({ userId, bookId });
    res.status(200).json(borrow);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const listBorrowedBooks = async (req: Request, res: Response) => {
  try {
    const borrowedBooks = await borrowService.listBorrowedBooks();
    res.status(200).json(borrowedBooks);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
