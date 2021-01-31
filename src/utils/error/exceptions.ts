process.on('uncaughtException', (err) => {
  console.log(err.message);
  console.log(err.stack);
  process.exitCode = 1;
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exitCode = 1;
});
