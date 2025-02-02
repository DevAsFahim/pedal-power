import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import Bicycle from '../bicycle/bicycle.model';
import { IOrder } from './order.interface';
import Order from './order.model';

const orderABicycleIntoDB = async (payload: IOrder) => {
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
  orderABicycleIntoDB,
  calculateRevenueFromDB,
};
