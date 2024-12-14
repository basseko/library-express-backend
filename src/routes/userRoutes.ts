import { Router } from "express";
import authenticate from "../middlewares/authMiddleware";
import { login, register } from "../controllers/authController";
import {
  listUsers,
  getUserDetails,
  getUserProfile,
  updateUser,
  deleteUser,
} from "../controllers/userController";
import { validateRequest } from "../middlewares/validateRequest";
import {
  userRegistrationSchema,
  userLoginSchema,
  userUpdateSchema,
  userIdParamSchema,
} from "../schemas/userSchemas";

const router = Router();

/**
 * @swagger
 * /users:
 *   get:
 *     summary: List all users
 *     tags: [Users]
 *     description: Returns a list of all users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get("/", listUsers);

/**
 * @swagger
 * /users/profile:
 *   get:
 *     summary: Get the authenticated user's profile
 *     tags: [Users]
 *     description: Returns the profile details of the authenticated user
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: The user's profile
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       403:
 *         description: Forbidden, if the user is not authenticated
 */
router.get("/profile", authenticate, getUserProfile);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get details of a specific user by ID
 *     tags: [Users]
 *     description: Returns the details of a user based on their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.get(
  "/:id",
  validateRequest(userIdParamSchema, "params"),
  getUserDetails
);

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user
 *     tags: [Users]
 *     description: Update the details of a specific user
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
router.put(
  "/:id",
  authenticate,
  validateRequest(userIdParamSchema, "params"),
  validateRequest(userUpdateSchema, "body"),
  updateUser
);

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     description: Deletes a user based on their ID
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */
router.delete(
  "/:id",
  authenticate,
  validateRequest(userIdParamSchema, "params"),
  deleteUser
);

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     description: Creates a new user and returns the user's details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       201:
 *         description: User successfully registered
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Invalid input
 */
router.post(
  "/register",
  validateRequest(userRegistrationSchema, "body"),
  register
);

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Login a user
 *     tags: [Users]
 *     description: Logs a user in and returns a token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: User successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid credentials
 */
router.post("/login", validateRequest(userLoginSchema, "body"), login);

export default router;
