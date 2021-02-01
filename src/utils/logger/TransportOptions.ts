/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { FileTransportOptions } from 'winston/lib/winston/transports';

export default class TransportOptions implements FileTransportOptions {
  filename: string;
  level: string;
  maxFiles: number;
  maxsize: number;

  constructor({
    level = 'info',
    fileName = 'untitled',
    maxsize = 5242880,
    maxFiles = 1,
  }) {
    this.filename = `./logs/${fileName || level}.log`;
    this.level = level;
    this.maxsize = maxsize;
    this.maxFiles = maxFiles;
  }
}
