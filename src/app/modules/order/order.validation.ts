import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    product: z.string({ required_error: 'Product ID is required.' }),
    quantity: z
      .number({ required_error: 'Quantity is required.' })
      .min(1, { message: 'Quantity must be at least 1.' }),
    totalPrice: z.number({ required_error: 'Total price is required.' }),
  }),
});

export const OrderValidations = {
    createOrderValidationSchema
}