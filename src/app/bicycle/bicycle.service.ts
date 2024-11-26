import { IBicycle } from './bicycle.interface';
import Bicycle from './bicycle.model';

const createBicycleIntoDB = async (bicycle: IBicycle) => {
  const result = await Bicycle.create(bicycle);

  return result;
};

const getAllBicyclesFromDB = async () => {
  const result = await Bicycle.find();

  return result;
};

const getSingleBicycleFromDB = async (id: string) => {
  const result = await Bicycle.findOne({ _id: id });

  return result;
};

const updateSingleBicycleIntoDB = async (id: string, updateData: object) => {
  const result = await Bicycle.updateOne(
    { _id: id },
    { $set: updateData },
    { runValidators: true },
  );
  return result;
};

const deleteSingleBicycleFromDB = async (id: string) => {
  const result = await Bicycle.deleteOne({ _id: id });
  return result;
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  updateSingleBicycleIntoDB,
  deleteSingleBicycleFromDB
};
