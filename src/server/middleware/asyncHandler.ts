import Express from "express";

export const asyncHandler =
  (
    fn: (
      req: Express.Request,
      res: Express.Response,
      next: Express.NextFunction
    ) => any
  ) =>
  (req: Express.Request, res: Express.Response, next: Express.NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
