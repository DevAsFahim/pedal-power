import { UserServices } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createUser = catchAsync(async (req, res) => {
  const result = await UserServices.createUserIntoDB(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'User is created successfully!',
    data: result,
  });
});

const getAllUser = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Users are retrieved successfully!',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req, res) => {
  const { email } = req.params;

  const result = await UserServices.getSingleUserFromDB(email);
  console.log(result)

  res.status(httpStatus.OK).json({
    success: true,
    message: 'User is retrieved successfully!',
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getAllUser,
  getSingleUser,
};
