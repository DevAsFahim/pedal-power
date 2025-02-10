import mongoose from 'mongoose';
import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    products: z.array(
      z.object({
        product: z
          .string()
          .refine((val) => mongoose.Types.ObjectId.isValid(val), {
            message: 'Invalid product ID',
          }),
        quantity: z.number().min(1, 'Quantity must be at least 1'),
      }),
    ),
    // totalPrice: z.number({ required_error: 'Total price is required.' }),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
