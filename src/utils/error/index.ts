/* eslint-disable no-unused-vars */
import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { Request, Response, NextFunction } from 'express';
import './exceptions';
import restErrors from './rest-errors';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

type Err = {
  statusCode: number | null;
  message: string;
};

type Handler = (req: Request, res: Response, next: NextFunction) => void;

const wrapper = (callback: Handler): Handler => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (e) {
    return next(e);
  }
};

// eslint-disable-next-line no-unused-vars
const handle = (err: Err, req: Request, res: Response, next: NextFunction) => {
  const { statusCode, message } = err;

  const error = {
    statusCode: statusCode || INTERNAL_SERVER_ERROR,
    message: statusCode ? message : getReasonPhrase(INTERNAL_SERVER_ERROR),
  };

  res.status(error.statusCode).json(error);
};

export default {
  handle,
  wrapper,
  rest: restErrors,
};
