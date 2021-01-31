import { Express } from 'express';
import Bot from './Bot';

const bot = new Bot(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
  ctx.reply('Fuck you! I am busy!');
});

bot.on('text', (ctx) => {
  const { text } = ctx.message;

  if (text === 'message_info') {
    ctx.reply(JSON.stringify(ctx.message));
  }
});

export const init = (app: Express): void => {
  if (process.env.MODE === 'PROD') {
    bot.startProd(app);
    return;
  }

  bot.startDev();
};

export default bot;
