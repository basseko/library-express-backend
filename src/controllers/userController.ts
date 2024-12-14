import { Request, Response } from "express";
import * as userService from "../services/userService";

export const listUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.listUsers();
    res.status(200).json(users);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const getUserDetails = async (req: Request, res: Response) => {
  try {
    const user = await userService.getUserDetails(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};
("");

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      res.status(403).json({ message: "User not found, access denied" });
      return;
    }
    const user = await userService.getUserDetails(req.user.id);
    res.status(200).json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred" });
    }
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(updatedUser);
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error: unknown) {
    res
      .status(500)
      .json({
        message:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
  }
};
