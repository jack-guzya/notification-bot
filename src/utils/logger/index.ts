import morgan from 'morgan';
import winston from 'winston';
import { Request } from 'express';
import middleware from './middleware';
import config from './config';

morgan.token('body', (req: Request) => JSON.stringify(req.body));
morgan.token('query', (req: Request) => JSON.stringify(req.query));

export const logger = winston.createLogger(config);

const stream = {
  write: (message: string) => {
    logger.info(message);
  },
};

export default {
  request: morgan(
    ':method :status [:response-time ms] \nurl: :url \nquery: :query \nbody: :body',
    { stream }
  ),
  serverError: middleware.createForServerError(logger),
  restError: middleware.createForRestError(logger),
};
