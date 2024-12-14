import { Router } from "express";
import {
  addBook,
  searchBooks,
  getBookDetails,
} from "../controllers/bookController";
import {
  borrowBook,
  returnBook,
  listBorrowedBooks,
} from "../controllers/borrowController";
import authenticate from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest"; // Import validation middleware
import {
  addBookSchema,
  searchBooksSchema,
  bookIdParamSchema,
} from "../schemas/bookSchemas"; // Import Zod schemas

const router = Router();

/**
 * @swagger
 * /books/add:
 *   post:
 *     summary: Add a new book to the library
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               genre:
 *                 type: string
 *               year:
 *                 type: integer
 *             required:
 *               - title
 *               - author
 *               - genre
 *               - year
 *     responses:
 *       201:
 *         description: Book added successfully
 *       500:
 *         description: Internal server error
 */
router.post("/add", validateRequest(addBookSchema, "body"), addBook);

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Search for books in the library
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         required: false
 *         description: Search by book title
 *         schema:
 *           type: string
 *       - in: query
 *         name: author
 *         required: false
 *         description: Search by author name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of books matching the search criteria
 *       500:
 *         description: Internal server error
 */
router.get("/search", validateRequest(searchBooksSchema, "query"), searchBooks);

/**
 * @swagger
 * /books/borrowed:
 *   get:
 *     summary: Get a list of borrowed books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: List of borrowed books
 *       500:
 *         description: Internal server error
 */
router.get("/borrowed", listBorrowedBooks);

/**
 * @swagger
 * /books/borrow/{id}:
 *   post:
 *     summary: Borrow a book from the library
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to borrow
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request (e.g., user not authenticated)
 *       500:
 *         description: Internal server error
 */
router.post(
  "/borrow/:id",
  authenticate,
  validateRequest(bookIdParamSchema, "params"),
  borrowBook
);

/**
 * @swagger
 * /books/return/{id}:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to return
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request (e.g., user not authenticated)
 *       500:
 *         description: Internal server error
 */
router.post(
  "/return/:id",
  authenticate,
  validateRequest(bookIdParamSchema, "params"),
  returnBook
);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get details of a specific book by ID
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the book to get details for
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Book details retrieved successfully
 *       404:
 *         description: Book not found
 *       500:
 *         description: Internal server error
 */
router.get(
  "/:id",
  validateRequest(bookIdParamSchema, "params"),
  getBookDetails
);

export default router;
