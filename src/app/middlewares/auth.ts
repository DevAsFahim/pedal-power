import { StatusCodes } from 'http-status-codes';
import AppError from '../error/AppError';
import { TUserRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRole: TUserRole[]) => {
  return catchAsync(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Your are not authorized!');
    }

    let decoded;
    // check if the toke is valid
    try {
      decoded = jwt.verify(
        token,
        config.jwt_access_secret as string,
      ) as JwtPayload;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
    } catch (err) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'Unauthorized !');
    }

    const { email, role, iat } = decoded;

    const user = await User.findOne({ email: email });
    //check if user exists
    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, 'This user is not found !');
    }

    // check if user is blocked
    if (user?.isBlocked) {
      throw new AppError(StatusCodes.FORBIDDEN, 'This user is blocked !');
    }

    if (requiredRole && !requiredRole.includes(role)) {
      throw new AppError(StatusCodes.UNAUTHORIZED, 'You are not authorized');
    }

    // decoded undefined
    // req.user = decoded as JwtPayload;
    req.user = user;

    next();
  });
};

export default auth;
