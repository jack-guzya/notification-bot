import { Telegraf } from 'telegraf';

export default class Bot extends Telegraf {
  startProd = async (): Promise<string> => {
    await this.telegram.setWebhook(`${process.env.URL}/${this.telegram.token}`);

    return 'Production mode';
  };

  startDev = async (): Promise<string> => {
    await this.telegram.deleteWebhook();

    process
      .once('SIGINT', () => this.stop('SIGINT'))
      .once('SIGTERM', () => this.stop('SIGTERM'));

    await this.launch();

    return 'Development mode';
  };
}
