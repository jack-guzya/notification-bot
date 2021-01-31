import 'module-alias/register';
import './common/config';
import app from './app';

app.listen(process.env.PORT, () =>
  console.log(`App is running on http://localhost:${process.env.PORT}`)
);
