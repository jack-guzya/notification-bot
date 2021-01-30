import express from 'express';
import chatRouter from './resources/chat/chat.router';
import tokenRouter from './resources/token/token.router';

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    return;
  }
  next();
});

app.use('/token', tokenRouter);

tokenRouter.use('/:tokenId/chat', chatRouter);

export default app;
