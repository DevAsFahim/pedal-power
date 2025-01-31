import { IOrder } from './order.interface';
import Order from './order.model';

const orderABicycleIntoDB = async (orderData: IOrder) => {
  const order = await Order.create(orderData);
  return order;
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
