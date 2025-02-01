import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Bicycle from '../bicycle/bicycle.model';
import { OrderServices } from './order.service';

const orderABicycle = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;

    const bicycle = await Bicycle.findOne({ _id: orderData.product });

    // check if bicycle exists or not
    if (!bicycle) {
      res.status(404).json({
        message: 'Product not found',
        status: false,
      });
      return;
    }

    // check quantity
    if (bicycle.quantity < orderData.quantity) {
      res.status(400).json({
        message: 'Insufficient stock available',
        status: false,
        data: {
          availableStock: bicycle.quantity,
        },
      });
      return;
    }

    const order = await OrderServices.orderABicycleIntoDB(orderData);

    bicycle.quantity = bicycle.quantity - orderData.quantity;
    if (bicycle.quantity === 0) {
      bicycle.inStock = false;
    }
    await bicycle.save();

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: order,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to create order',
      status: false,
      error: {
        name: error.name,
        ...(error.errors && { errors: error.errors }),
      },
    });
  }
};

const calculateRevenue = async (req: Request, res: Response) => {
  try {
    const result = await OrderServices.calculateRevenueFromDB();
    console.log(result);

    const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.status(500).json({
        message: 'Failed to calculate revenue',
        status: false,
        error: {
          name: error.name,
          message: error.message,
        },
        stack: `Error: Something went wrong\n  ${error.stack}`,
      });
    } else {
      res.status(500).json({
        message: 'An unknown error occurred',
        status: false,
      });
    }
  }
};

export const OrderCollections = {
  orderABicycle,
  calculateRevenue,
};
