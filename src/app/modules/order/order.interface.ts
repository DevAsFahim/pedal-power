import mongoose from 'mongoose';

export interface IOrder {
  user: mongoose.Types.ObjectId;
  product: mongoose.Types.ObjectId;
  quantity: number;
  totalPrice: number;
}
