/* eslint-disable import/no-unresolved */
import fs from 'fs/promises';
import path from 'path';
import bot from '../../bot';

const sendMessage = async (id: string, message: string) => {
  bot.telegram.sendMessage(`-${id}`, message);
};

const sendDocument = async (id: string, filename: string, payload: object) => {
  const filepath = path.join(__dirname, '../../../payload.json');
  await fs.writeFile(filepath, JSON.stringify(payload));

  bot.telegram.sendDocument(`-${id}`, {
    source: filepath,
    filename,
  });
};

export default { sendMessage, sendDocument };
