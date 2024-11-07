import 'colors';
import express from 'express';
import morgan from 'morgan';
import { env, validateEnv } from './config/env.config';
import { NotFoundException } from './lib/exceptions';
import { devConsole } from './lib/utils';
import { handleErrorRequest } from './middlewares/handle-error-request';
import { openApiSpecs, serveApiReference } from './openapi';

const app = express();
validateEnv();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
if (env.NODE_ENV === 'development') {
  app.use(morgan('common'));
}

app.get('/', (req, res) => {
  res.json({
    message: 'Api is running fine...',
    env: env.NODE_ENV,
    date: new Date().toISOString()
  });
});

/* --------- routes --------- */
app.get('/doc', (req, res) => {
  res.json(openApiSpecs);
});
app.get('/reference', serveApiReference);
app.use(async () => {
  throw new NotFoundException();
});
app.use(handleErrorRequest);

app.listen(env.PORT, () => {
  devConsole(`⚡[Server]: listening at http://localhost:${env.PORT}`.yellow);
});

export default app;
