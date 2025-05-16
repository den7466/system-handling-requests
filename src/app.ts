import express from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import {
  DB_ADDRESS,
  DB_NAME,
  ORIGIN_ALLOW,
  PORT,
} from './config';
import indexRouter from './routes/index';
import errorHandler from './middlewares/error-handler';
import { errorLogger, requestLogger } from './middlewares/logger';

const cors = require('cors');

const app = express();

app.use(cors({
  origin: ORIGIN_ALLOW,
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
mongoose.connect(`${DB_ADDRESS}`, { dbName: DB_NAME });
app.use(requestLogger);
app.use('/', indexRouter);
app.use(errors());
app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на ${PORT} порту`);
});

// Подключить swagger
