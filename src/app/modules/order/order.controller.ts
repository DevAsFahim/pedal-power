import { OrderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';

const createOrder = catchAsync(async (req, res) => {
  const orderData = req.body;

  const order = await OrderServices.createOrderIntoDB(req.user, orderData);

  res.status(200).json({
    message: 'Order created successfully',
    status: true,
    data: order,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const order = await OrderServices.getAllOrdersFromDb();

  res.status(200).json({
    message: 'Orders are retrieved successfully',
    status: true,
    data: order,
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
  getAllOrders,
  calculateRevenue,
};
