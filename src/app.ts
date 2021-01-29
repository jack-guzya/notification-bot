import express from 'express';
import reportRouter from './resources/report/report.router';

const app = express();

app.use(express.json());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    return;
  }
  next();
});

app.use('/report', reportRouter);

export default app;
