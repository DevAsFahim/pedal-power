import { StatusCodes } from 'http-status-codes';
import AppError from '../../error/AppError';
import { IBicycle } from './bicycle.interface';
import Bicycle from './bicycle.model';
import QueryBuilder from '../../builder/QueryBuilder';
import { bicycleSearchableFields } from './bicycle.constant';

const createBicycleIntoDB = async (bicycle: IBicycle) => {
  const result = await Bicycle.create(bicycle);

  return result;
};

const getAllBicyclesFromDB = async (query: Record<string, unknown>) => {
  const bicycleQuery = new QueryBuilder(Bicycle.find(), query)
    .search(bicycleSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await bicycleQuery.modelQuery;
  const meta = await bicycleQuery.countTotal();

  return { meta, result };
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
  // Check if a document was deleted
  const bicycle = await Bicycle.findById(id);
  if (!bicycle) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bicycle not found!');
  }

  const result = await Bicycle.deleteOne({ _id: id });
  return result;
};

export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicyclesFromDB,
  getSingleBicycleFromDB,
  updateSingleBicycleIntoDB,
  deleteSingleBicycleFromDB,
};
