import { Request, Response, NextFunction } from "express";
import { ApiResponse } from "../types";

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
}

export const errorHandler = (
  err: ApiError,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error("[Error]", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  const response: ApiResponse<null> = {
    data: null as unknown as null,
    success: false,
    message,
  };

  res.status(statusCode).json(response);
};

export const notFoundHandler = (
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const response: ApiResponse<null> = {
    data: null as unknown as null,
    success: false,
    message: "Resource not found",
  };

  res.status(404).json(response);
};
