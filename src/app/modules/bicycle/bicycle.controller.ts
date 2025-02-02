import { BicycleServices } from './bicycle.service';
import catchAsync from '../../utils/catchAsync';

const createBicycle = catchAsync(async (req, res) => {
  const bicycleData = req.body;

  const result = await BicycleServices.createBicycleIntoDB(bicycleData);

  res.status(200).json({
    message: 'Bicycle created successfully',
    success: true,
    data: result,
  });
});

const getAllBicycles = catchAsync(async (req, res) => {
  const result = await BicycleServices.getAllBicyclesFromDB();

  res.status(200).json({
    message: 'All Bicycles retrieved successfully',
    success: true,
    data: result,
  });
});

const getSingleBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await BicycleServices.getSingleBicycleFromDB(productId);

  res.status(200).json({
    message: 'Bicycles retrieved successfully',
    success: true,
    data: result,
  });
});

const updateSingleBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const updateData = req.body;

  const result = await BicycleServices.updateSingleBicycleIntoDB(
    productId,
    updateData,
  );

  res.status(200).json({
    message: 'Bicycle updated successfully',
    success: true,
    data: result,
  });
});

const deleteSingleBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;

  const result = await BicycleServices.deleteSingleBicycleFromDB(productId);

  res.status(200).json({
    message: 'Bicycle deleted successfully',
    success: true,
    data: result,
  });
});

export const BicycleControllers = {
  createBicycle,
  getAllBicycles,
  getSingleBicycle,
  updateSingleBicycle,
  deleteSingleBicycle,
};
