import { Request, Response, NextFunction } from "express";

export function requireBodyFields(fields: string[]) {
  return function validateRequiredFields(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    for (const field of fields) {
      if (!req.body[field]) {
        res.status(400).json({
          message: `${field} is required`,
        });
        return;
      }
    }

    next();
  };
}