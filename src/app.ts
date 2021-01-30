import express from 'express';
import error from './errors';
import chatRouter from './resources/chat/chat.router';
import tokenRouter from './resources/token/token.router';

process.on('uncaughtException', (err) => {
  console.log(err.message);
  console.log(err.stack);
  process.exit();
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit();
});

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

app.use(error.handle);

export default app;
