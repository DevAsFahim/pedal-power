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
    const { productId } = req.params;

    const bicycle = await BicycleServices.getSingleBicycleFromDB(productId);

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
    const { productId } = req.params;
    const updateData = req.body;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        message: 'Invalid bicycle ID format',
        success: false,
      });
      return;
    }

    const result = await BicycleServices.updateSingleBicycleIntoDB(
      productId,
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

const deleteSingleBicycle = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;

    // Validate ID format
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      res.status(400).json({
        message: 'Invalid bicycle ID format',
        success: false,
      });
      return;
    }

    const result = await BicycleServices.deleteSingleBicycleFromDB(productId);

    // Check if a document was deleted
    if (result.deletedCount === 0) {
      res.status(404).json({
        message: 'Bicycle not found',
        success: false,
      });
      return;
    }

    res.status(200).json({
      message: 'Bicycle deleted successfully',
      success: true,
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      message: 'Failed to delete bicycle',
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
  deleteSingleBicycle,
};
