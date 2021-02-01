import { format, transports, LoggerOptions } from 'winston';
import TransportOptions from './TransportOptions';

const transportConfig = {
  console: {
    level: 'info',
    handleExceptions: true,
    handleRejections: true,
    format: format.colorize({
      all: true,
      colors: { info: 'green', error: 'red' },
    }),
  },

  files: {
    error: new TransportOptions({
      level: 'error',
    }),

    info: new TransportOptions({
      level: 'info',
    }),

    exception: new TransportOptions({
      fileName: 'exception',
    }),
  },
};

const config: LoggerOptions = {
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss Z' }),
    format.printf(
      ({ level, message, timestamp }) => `${timestamp} [${level}]: ${message}\n`
    )
  ),
  handleExceptions: true,
  handleRejections: true,
  transports: [
    new transports.Console(transportConfig.console),
    new transports.File(transportConfig.files.error),
    new transports.File(transportConfig.files.info),
  ],
  exceptionHandlers: [new transports.File(transportConfig.files.exception)],
  rejectionHandlers: [new transports.File(transportConfig.files.exception)],
};

export default config;
