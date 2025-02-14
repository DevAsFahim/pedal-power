import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import Bicycle from '../bicycle/bicycle.model';
import { IOrder } from './order.interface';
import Order from './order.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { JwtPayload } from 'jsonwebtoken';
import { orderUtils } from './order.utils';

const createOrderIntoDB = async (
  user: JwtPayload,
  payload: IOrder,
  client_ip: string,
) => {
  if (!payload.products.length)
    throw new AppError(StatusCodes.NOT_ACCEPTABLE, 'Order is not specified');

  const products = payload.products;

  let totalPrice = 0;
  const productDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Bicycle.findById(item.product);
      if (product) {
        const subtotal = product ? (product.price || 0) * item.quantity : 0;
        totalPrice += subtotal;
        return item;
      }
    }),
  );

  let order = await Order.create({
    user,
    products: productDetails,
    totalPrice,
  });

  // payment integration
  const shurjopayPayload = {
    amount: totalPrice,
    order_id: order._id,
    currency: 'BDT',
    customer_name: user.name,
    customer_address: user.address,
    customer_email: user.email,
    customer_phone: 'N/A',
    customer_city: 'N/A',
    client_ip,
  };

  const payment = await orderUtils.makePaymentAsync(shurjopayPayload);

  if (payment?.transactionStatus) {
    order = await order.updateOne({
      transaction: {
        id: payment.sp_order_id,
        transactionStatus: payment.transactionStatus,
      },
    });
  }

  return payment.checkout_url;

  // // check quantity
  // if (bicycle.quantity < payload.quantity) {
  //   throw new AppError(
  //     StatusCodes.BAD_REQUEST,
  //     'Insufficient stock available!',
  //   );
  // }

  // payload.user = user._id;

  // const result = await Order.create(payload);

  // // reduce quantity from bicycle
  // if (result) {
  //   bicycle.quantity = bicycle.quantity - result.quantity;
  //   if (bicycle.quantity === 0) {
  //     bicycle.inStock = false;
  //   }
  //   await bicycle.save();
  // }

  // return result;
};

const verifyPayment = async (order_id: string) => {
  const verifiedPayment = await orderUtils.verifyPaymentAsync(order_id);

  if (verifiedPayment.length) {
    await Order.findOneAndUpdate(
      {
        'transaction.id': order_id,
      },
      {
        'transaction.bank_status': verifiedPayment[0].bank_status,
        'transaction.sp_code': verifiedPayment[0].sp_code,
        'transaction.sp_message': verifiedPayment[0].sp_message,
        'transaction.transactionStatus': verifiedPayment[0].transaction_status,
        'transaction.method': verifiedPayment[0].method,
        'transaction.date_time': verifiedPayment[0].date_time,
        status:
          verifiedPayment[0].bank_status == 'Success'
            ? 'Paid'
            : verifiedPayment[0].bank_status == 'Failed'
              ? 'Pending'
              : verifiedPayment[0].bank_status == 'Cancel'
                ? 'Cancelled'
                : '',
      },
    );
  }

  return verifiedPayment;
};

const getAllOrdersFromDb = async (query: Record<string, unknown>) => {
  const bicycleQuery = new QueryBuilder(Order.find().populate('user'), query)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bicycleQuery.modelQuery;
  const meta = await bicycleQuery.countTotal();

  return { meta, result };
};

const getMyOrdersFromDb = async (user: JwtPayload) => {
  const result = Order.find({ user: user._id }).populate('user');

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
  createOrderIntoDB,
  verifyPayment,
  getAllOrdersFromDb,
  getMyOrdersFromDb,
  calculateRevenueFromDB,
};
