import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { User } from '../user/user.model';
import { ILoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';

const login = async (payload: ILoginUser) => {
  // check if user is exists
  const user = await User.findOne({ email: payload.email });
  if (!user) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User not found!');
  }

  // check if user is already deleted
  if (user?.isBlocked) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'User is blocked!');
  }

  // check if password matches
  const isPasswordMatch = await bcrypt.compare(payload.password, user.password);

  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password is wrong!');
  }

  const jwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string, {
    expiresIn: config.jwt_access_expires_in as string,
  });

  const refreshToken = jwt.sign(
    jwtPayload,
    config.jwt_refresh_secret as string,
    {
      expiresIn: config.jwt_refresh_expires_in as string,
    },
  );

  return {
    accessToken,
    refreshToken,
  };
};

const changePassword = async (
  userData: JwtPayload,
  payload: { oldPassword: string; newPassword: string },
) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
  }

  // check if password matches
  const isPasswordMatch = await bcrypt.compare(
    payload.oldPassword,
    user?.password,
  );
  if (!isPasswordMatch) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'Password is wrong!');
  }

  // hash new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt),
  );

  await User.findOneAndUpdate(
    { email: user.email, role: user.role },
    { password: newHashedPassword, passwordChangedAt: new Date() },
  );

  return null;
};

export const AuthServices = {
  login,
  changePassword,
};
