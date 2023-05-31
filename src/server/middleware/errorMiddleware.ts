import Express from "express";
import HttpException from "../exceptions/HttpException";

export const notFound = (
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (
  err: HttpException,
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  //   check for cast error
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "😅" : err.stack,
  });
};
