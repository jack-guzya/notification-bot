import { Telegraf } from 'telegraf';
import { Express } from 'express';

export default class Bot extends Telegraf {
  startProd = async (app: Express): Promise<string> => {
    this.telegram.setWebhook(`${process.env.URL}/${this.telegram.token}`);
    await app.use(this.webhookCallback(`/${this.telegram.token}`));

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
