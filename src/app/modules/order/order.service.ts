import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import Bicycle from '../bicycle/bicycle.model';
import { IOrder } from './order.interface';
import Order from './order.model';
import { JwtPayload } from 'jsonwebtoken';
import { User } from '../user/user.model';
import QueryBuilder from '../../builder/QueryBuilder';

const createOrderIntoDB = async (userData: JwtPayload, payload: IOrder) => {
  // check if user exists
  const user = await User.findOne({ email: userData.email });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found!');
  }

  const bicycle = await Bicycle.findById(payload.product);
  // check if bicycle exists or not
  if (!bicycle) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bicycle not found!');
  }

  // check quantity
  if (bicycle.quantity < payload.quantity) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      'Insufficient stock available!',
    );
  }

  payload.user = user._id;

  const result = await Order.create(payload);

  // reduce quantity from bicycle
  if (result) {
    bicycle.quantity = bicycle.quantity - result.quantity;
    if (bicycle.quantity === 0) {
      bicycle.inStock = false;
    }
    await bicycle.save();
  }

  return result;
};

const getAllOrdersFromDb = async (query: Record<string, unknown>) => {
  const bicycleQuery = new QueryBuilder(
    Order.find().populate('user').populate('product'),
    query,
  )
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bicycleQuery.modelQuery;
  const meta = await bicycleQuery.countTotal();

  return { meta, result };
};

const calculateRevenueFromDB = async () => {
  const result = await Order.aggregate([
    {
      $lookup: {
        from: 'bicycles',
        localField: 'product',
        foreignField: '_id',
        as: 'bicycleDetails',
      },
    },
    { $unwind: '$bicycleDetails' },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: { $multiply: ['$quantity', '$bicycleDetails.price'] },
        },
      },
    },
    {
      $project: {
        _id: 0,
        totalRevenue: 1,
      },
    },
  ]);

  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDb,
  calculateRevenueFromDB,
};
