import { Telegraf } from 'telegraf';
import { Express } from 'express';
import fetch from 'node-fetch';

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
  ctx.reply('Fuck you! I am busy!');
});

bot.command('jack', (ctx) => ctx.reply('Hi, jack!'));

bot.on('text', (ctx) => {
  const { text } = ctx.message;

  if (text === 'message_info') {
    ctx.reply(JSON.stringify(ctx.message));
  }
});

const startDevMode = async () => {
  console.log('Starting a bot in development mode');

  await fetch(
    `https://api.telegram.org/bot${process.env.BOT_TOKEN}/deleteWebhook`
  );

  bot.launch();
};

const startProdMode = async (app: Express) => {
  console.log('Starting a bot in production mode');

  bot.telegram.setWebhook(`${process.env.URL}/${process.env.BOT_TOKEN}`);
  app.use(bot.webhookCallback(`/${process.env.BOT_TOKEN}`));
};

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;
export { startDevMode, startProdMode };
