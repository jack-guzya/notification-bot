import error from '../../errors';

const check = (token: string) => {
  if (process.env.BOT_TOKEN !== token) {
    throw new error.rest.Forbidden('Incorrect token');
  }
};

export default { check };
