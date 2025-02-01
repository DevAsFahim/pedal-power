/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';
import config from '../config';
import { ZodError } from 'zod';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let message = 'Oops! Something went wring!';
  let status = 500;
  if (err instanceof ZodError) {
    message = 'Validation Error!';
    status = StatusCodes.BAD_REQUEST;
  }
  if (err instanceof mongoose.Error.ValidationError) {
    message = 'Validation Error!';
    status = StatusCodes.BAD_REQUEST;
  }
  if (err instanceof mongoose.Error.CastError) {
    message = 'Invalid Id!';
    status = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    const messageMatch = err.message.match(/"([^"]*)"/);
    message = messageMatch;
    status = StatusCodes.CONFLICT;
  }


  res.status(500).json({
    success: false,
    message: 'Oops! Something went wring!',
    error: err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
