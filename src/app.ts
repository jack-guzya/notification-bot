/* eslint-disable import/no-unresolved */
import express from 'express';
import error from '@utils/error';
import chatRouter from '@resources/chat/chat.router';
import tokenRouter from '@resources/token/token.router';
import { init as initBot } from './bot';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

initBot(app);

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    return;
  }
  next();
});

app.use('/token', tokenRouter);

tokenRouter.use('/:tokenId/chat', chatRouter);

app.use(error.handle);

export default app;
