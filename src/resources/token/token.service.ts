const check = (token: string) => {
  return process.env.BOT_TOKEN === token;
};

export default { check };
