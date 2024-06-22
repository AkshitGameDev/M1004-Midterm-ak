import createError, { HttpError } from 'http-errors';
import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';

dotenv.config();

import mongoose from 'mongoose';
import db from './db';

mongoose.connect(db.remoteURI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB Atlas`);
})


import indexRouter from '../Routes/index';
import { dot } from 'node:test/reporters';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', indexRouter);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err: HttpError, req:Request, res:Response, next:NextFunction) 
{
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.end('error - please use /api as a route prefix for your API requests');
});

export default app;
