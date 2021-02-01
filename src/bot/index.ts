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

export const init = async (app: Express): Promise<string> => {
  try {
    return process.env.MODE === 'PROD'
      ? await bot.startProd(app)
      : await bot.startDev();
  } catch (err) {
    throw Error(`Can't start the bot:\n${err}`);
  }
};

export default bot;
