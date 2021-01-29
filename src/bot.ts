import { Telegraf } from 'telegraf';

const bot = new Telegraf(process.env.BOT_TOKEN as string);

bot.start((ctx) => {
  ctx.reply('Fuck you! I am busy!');
});

bot.on('text', (ctx) => {
  const { text } = ctx.message;

  if (text === 'message_info') {
    ctx.reply(JSON.stringify(ctx.message));
  }
});

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

export default bot;
