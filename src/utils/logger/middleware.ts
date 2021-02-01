// import helper from './helpers';
import { ErrorRequestHandler } from 'express';
import winston from 'winston';

type Middleware = (logger: winston.Logger) => ErrorRequestHandler;

const createForServerError: Middleware = (logger) => (err, req, res, next) => {
  if (err?.statusCode) {
    next(err);
    return;
  }

  const { message, stack } = err;
  logger.error(`${req.method} ${req.url}\n${message}\n${stack}\n`);

  next(err);
};

const createForRestError: Middleware = (logger) => (err, req, res, next) => {
  if (!err?.statusCode) {
    next(err);
    return;
  }

  const { statusCode, message } = err;
  logger.error(`${req.method} ${statusCode}\n url: ${req.url}\n ${message}\n`);

  next(err);
};

export default { createForRestError, createForServerError };
