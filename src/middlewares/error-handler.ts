import { Request, Response, NextFunction } from "express";

import httpStatus from "http-status";

type AppError = Error & {
  type: string;
};

export default function errorHandlingMiddleware(
  error: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log(error);

  const errors = {
    NotFound: httpStatus.NOT_FOUND,
    Conflict: httpStatus.CONFLICT,
    BadRequest: httpStatus.BAD_REQUEST,
    UnprocessableEntity: httpStatus.UNPROCESSABLE_ENTITY,
    Forbidden: httpStatus.FORBIDDEN,
  };

  const status = errors[error.name] || httpStatus.INTERNAL_SERVER_ERROR;

  return res.status(status).send(error.message);
}
