import express from 'express';
import logMiddleware, { logger } from '@utils/logger';
import error from '@utils/error';
import chatRouter from '@resources/chat/chat.router';
import tokenRouter from '@resources/token/token.router';
import bot, { init } from './bot';

const app = express();

app.use(bot.webhookCallback(`/${process.env.BOT_TOKEN}`));

init().then((mode) => logger.info(`Bot has started: ${mode}`));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(logMiddleware.request);

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
