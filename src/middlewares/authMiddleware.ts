import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const secretKey = process.env.JWT_SECRET_KEY as string;

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "No token provided, access denied" });
    return;
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { userId: string };

    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
    });

    if (!user) {
      res.status(403).json({ message: "User not found, access denied" });
      return;
    }

    req.user = user;

    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid token, access denied" });
    return;
  }
};

export default authenticate;
