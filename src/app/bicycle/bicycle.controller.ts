import { Request, Response } from 'express';
import { BicycleServices } from './bicycle.service';
import mongoose from 'mongoose';

const createBicycle = async (req: Request, res: Response) => {
  try {
    const bicycleData = req.body;

    const result = await BicycleServices.createBicycleIntoDB(bicycleData);

    res.status(200).json({
      message: 'Bicycle created successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message:
        error.name === 'ValidationError'
          ? 'Validation failed'
          : 'An error occurred',
      success: false,
      error: {
        name: error.name,
        ...(error.errors && { errors: error.errors }),
      },
      stack: `Error: Something went wrong\n  ${error.stack}`,
    });
  }
};

const getAllBicycles = async (req: Request, res: Response) => {
  try {
    const result = await BicycleServices.getAllBicyclesFromDB();

    res.status(200).json({
      message: 'All Bicycles retrieved successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to retrieve bicycles',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
      stack: error.stack,
    });
  }
};

const getSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycleId } = req.params;

    const bicycle = await BicycleServices.getSingleBicycleFromDB(bicycleId);

    res.status(200).json({
      message: 'Bicycles retrieved successfully',
      success: true,
      data: bicycle,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to retrieve bicycle',
      success: false,
      error: {
        name: error.name,
        message: error.message,
      },
      stack: error.stack,
    });
  }
};

const updateSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { bicycleId } = req.params;
    const updateData = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(bicycleId)) {
      return res.status(400).json({
        message: 'Invalid bicycle ID format',
        success: false,
      });
    }

    const result = await BicycleServices.updateSingleBicycleIntoDB(
      bicycleId,
      updateData,
    );

    res.status(200).json({
      message: 'Bicycle updated successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to update bicycle',
      success: false,
      error: {
        name: error.name,
        ...(error.errors && { errors: error.errors }),
      },
      stack: `Error: Something went wrong\n  ${error.stack}`,
    });
  }
};

export const BicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  updateSingleBicycle,
};
