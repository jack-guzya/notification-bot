import { Telegraf } from 'telegraf';
import { Express } from 'express';

export default class Bot extends Telegraf {
  startProd = async (app: Express): Promise<void> => {
    try {
      this.telegram.setWebhook(`${process.env.URL}/${this.telegram.token}`);
      await app.use(this.webhookCallback(`/${this.telegram.token}`));
    } catch (err) {
      throw Error(`Can't set webhook:\n\n${err}`);
    }
  };

  startDev = async (): Promise<void> => {
    try {
      await this.telegram.deleteWebhook();

      process
        .once('SIGINT', () => this.stop('SIGINT'))
        .once('SIGTERM', () => this.stop('SIGTERM'));

      this.launch();
    } catch (err) {
      throw Error(`Can't delete webhook:\n\n${err}`);
    }
  };
}
