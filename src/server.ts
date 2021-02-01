import 'module-alias/register';
import '@common/config';
import { logger } from '@utils/logger';
import app from './app';

app.listen(process.env.PORT, () =>
  logger.info(`App is running on http://localhost:${process.env.PORT}`)
);
