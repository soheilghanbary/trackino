import { z } from 'zod';

export type CreateTransactionSchema = z.infer<typeof createTransactionSchema>;

export const createTransactionSchema = z.object({
  amount: z.coerce.number().positive().multipleOf(0.01),
  description: z.string(),
  date: z.coerce.date(),
  type: z.enum(['income', 'expense']),
});
