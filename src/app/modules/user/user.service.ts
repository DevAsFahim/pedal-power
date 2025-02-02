import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { IUser } from './user.interface';
import { User } from './user.model';
// import bcrypt from 'bcrypt';

const createUserIntoDB = async (payload: IUser) => {
  // check if user is already exists
  const user = await User.findOne({ email: payload.email });
  if (user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User is already exists!');
  }

  // const plainPassword = payload?.password;
  // let generatedPassword;

  // bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
  //   // Store hash in your password DB.
  // });

  const result = await User.create(payload);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await User.find();

  return result;
};

export const UserServices = {
  createUserIntoDB,
  getAllUserFromDB,
};
