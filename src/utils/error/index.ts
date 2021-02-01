import { StatusCodes, getReasonPhrase } from 'http-status-codes';
import { RequestHandler, ErrorRequestHandler } from 'express';
import restErrors from './rest-errors';

const { INTERNAL_SERVER_ERROR } = StatusCodes;

const wrapper = (callback: RequestHandler): RequestHandler => async (
  req,
  res,
  next
) => {
  try {
    return await callback(req, res, next);
  } catch (e) {
    return next(e);
  }
};

const handle: ErrorRequestHandler = (err, req, res, next) => {
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
