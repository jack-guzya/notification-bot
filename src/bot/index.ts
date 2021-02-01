import Bot from './Bot';

const bot = new Bot(process.env.BOT_TOKEN as string);

export const init = async (): Promise<string> => {
  try {
    return process.env.MODE === 'PROD'
      ? await bot.startProd()
      : await bot.startDev();
  } catch (err) {
    throw Error(`Can't start the bot:\n${err}`);
  }
};

bot.start((ctx) => {
  ctx.reply('Fuck you! I am busy!');
});

bot.on('text', (ctx) => {
  const { text } = ctx.message;

  if (text === 'message_info') {
    ctx.reply(JSON.stringify(ctx.message));
  }
});

export default bot;
