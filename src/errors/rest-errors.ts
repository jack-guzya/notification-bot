import { StatusCodes } from 'http-status-codes';

const { NOT_FOUND, BAD_REQUEST, FORBIDDEN, UNAUTHORIZED } = StatusCodes;

const createRestError = (statusCode: number) =>
  class extends Error {
    statusCode: number;

    constructor(message: string) {
      super(message);
      this.statusCode = statusCode;
    }
  };

export default {
  NotFound: createRestError(NOT_FOUND),
  BadRequest: createRestError(BAD_REQUEST),
  Forbidden: createRestError(FORBIDDEN),
  Unauthorized: createRestError(UNAUTHORIZED),
};
