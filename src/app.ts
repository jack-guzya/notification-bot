import express from 'express';
import error from './errors';
import { startDevMode, startProdMode } from './bot';
import chatRouter from './resources/chat/chat.router';
import tokenRouter from './resources/token/token.router';

process.on('uncaughtException', (err) => {
  console.log(err.message);
  console.log(err.stack);
  process.exitCode = 1;
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exitCode = 1;
});

const app = express();

if (process.env.MODE === 'PROD') {
  startProdMode(app);
} else {
  startDevMode();
}

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
