/* eslint-disable import/no-unresolved */
import express from 'express';
import error from '@utils/error';
import logMiddleware, { logger } from '@utils/logger';
import chatRouter from '@resources/chat/chat.router';
import tokenRouter from '@resources/token/token.router';
import { init as initBot } from './bot';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logMiddleware.request);

initBot(app).then((res) => logger.info(`Bot has started: ${res}`));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    return;
  }
  next();
});

app.use('/token', tokenRouter);

tokenRouter.use('/:tokenId/chat', chatRouter);

app.use(logMiddleware.serverError, logMiddleware.restError);

app.use(error.handle);

export default app;
