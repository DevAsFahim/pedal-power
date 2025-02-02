import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import config from '../config';

const handleZodError = (err: ZodError, res: Response) => {
  res.status(StatusCodes.BAD_REQUEST).json({
    success: false,
    message: 'Validation error!',
    error: err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default handleZodError;
