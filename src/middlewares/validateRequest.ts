import { Request, Response, NextFunction } from "express";
import { z } from "zod";

export function validateRequest(
  schema: z.ZodType<any>,
  source: "body" | "query" | "params"
) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          message: "Validation failed",
          errors: error.errors,
        });
        return;
      }
      next(error);
    }
  };
}
