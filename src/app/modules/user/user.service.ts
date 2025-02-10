import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';

const createUserIntoDB = async (payload: IUser) => {
  // check if user is already exists
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is already exists!');
  }

  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();

  return result;
};
const getSingleUserFromDB = async (email: string) => {
  const result = await User.findOne({ email });

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
