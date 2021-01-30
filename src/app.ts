import express from 'express';
import chatRouter from './resources/chat/chat.router';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    return;
  }
  next();
});

app.use('/chat', chatRouter);

export default app;
