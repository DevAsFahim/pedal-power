import { OrderServices } from './order.service';
import catchAsync from '../../utils/catchAsync';

const orderABicycle = catchAsync(async (req, res) => {
  const orderData = req.body;

  const order = await OrderServices.orderABicycleIntoDB(orderData);

  res.status(200).json({
    message: 'Order created successfully',
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
  orderABicycle,
  calculateRevenue,
};
