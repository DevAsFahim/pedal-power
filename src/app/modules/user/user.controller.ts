import { Request, Response } from 'express';
import { UserServices } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User is created successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
