import { z } from 'zod';

const createBicycleValidationSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }),
    brand: z.string({ required_error: 'Brand is required' }),
    model: z.string({ required_error: 'Model is required' }),
    price: z
      .number()
      .min(0, { message: 'Price must be a positive number.' })
      .refine((value) => value !== undefined, {
        message: 'Price is required.',
      }),
    type: z.enum(['Mountain', 'Road', 'Hybrid', 'BMX', 'Electric'], {
      message:
        'Type must be one of the following: Mountain, Road, Hybrid, BMX, Electric.',
    }),
    description: z.string({ required_error: 'Description is required.' }),
    quantity: z
      .number()
      .min(0, { message: 'Quantity must be a non-negative number.' })
      .refine((value) => value !== undefined, {
        message: 'Quantity is required.',
      }),
    inStock: z.boolean().optional(),
  }),
});

export const BicycleValidations = {
  createBicycleValidationSchema,
};
