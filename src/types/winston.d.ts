import winston from 'winston';

declare module 'winston' {
  interface LoggerOptions {
    handleRejections?: boolean;
    rejectionHandlers?: any;
  }
}
