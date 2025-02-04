import { Schema, model } from 'mongoose';
import { IBicycle } from './bicycle.interface';

// 2. Create a Schema for Bicycle.
const bicycleSchema = new Schema<IBicycle>(
  {
    name: {
      type: String,
      required: [true, 'Name is required. Please provide the bicycle name.'],
    },
    brand: {
      type: String,
      required: [true, 'Brand is required. Please provide the brand name.'],
    },
    model: {
      type: String,
      required: [true, 'Model is required. Please provide the model name.'],
    },
    image: {
      type: String,
      required: [true, 'Image is required. Please provide the image name.'],
    },
    price: {
      type: Number,
      required: [
        true,
        'Price is required. Please provide the price of the bicycle.',
      ],
      min: [0, 'Price must be a positive number.'],
    },
    type: {
      type: String,
      enum: {
        values: ['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'],
        message:
          'Type must be one of the following: Mountain, Road, Hybrid, BMX, Electric.',
      },
      required: [true, 'Type is required. Please specify the bicycle type.'],
    },
    description: {
      type: String,
      required: [
        true,
        'Description is required. Please provide a brief description of the bicycle.',
      ],
    },
    quantity: {
      type: Number,
      required: [
        true,
        'Quantity is required. Please provide the available quantity.',
      ],
      min: [0, 'Quantity must be a non-negative number.'],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true, versionKey: false },
);

const Bicycle = model<IBicycle>('Bicycle', bicycleSchema);

export default Bicycle;
