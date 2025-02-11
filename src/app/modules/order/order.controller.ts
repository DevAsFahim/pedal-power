import { OrderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';

const createOrder = catchAsync(async (req, res) => {
  const user = req.user;
  const order = await OrderServices.createOrderIntoDB(user, req.body, req.ip!);

  res.status(200).json({
    message: 'Order created successfully',
    status: true,
    data: order,
  });
});

const verifyPayment = catchAsync(async (req, res) => {
  const order = await OrderServices.verifyPayment(req.query.order_id as string);

  res.status(StatusCodes.CREATED).json({
    message: 'Order verified successfully',
    status: true,
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDb(req.query);

  res.status(200).json({
    message: 'Orders are retrieved successfully',
    status: true,
    // meta: result.meta,
    // data: result.result,
    data: result,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getMyOrdersFromDb(req.user);

  res.status(200).json({
    message: 'Orders are retrieved for user successfully',
    status: true,
    data: result,
  });
});

const calculateRevenue = catchAsync(async (req, res) => {
  const result = await OrderServices.calculateRevenueFromDB();

  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

  res.status(200).json({
    message: 'Revenue calculated successfully',
    status: true,
    data: {
      totalRevenue,
    },
  });
});

export const OrderCollections = {
  createOrder,
  verifyPayment,
  getAllOrders,
  calculateRevenue,
  getMyOrders,
};
