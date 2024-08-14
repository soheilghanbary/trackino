import { createTransactionSchema } from '@/schemas/transaction';
import { verifyToken } from '@/server/lib/token';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import prisma from '../db';

export const transactionRoute = new Hono()
  .get('/', async (c) => {
    const { userId } = await verifyToken(c);
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    return c.json(transactions);
  })
  .post('/', zValidator('json', createTransactionSchema), async (c) => {
    const values = await c.req.json();
    const { userId } = await verifyToken(c);
    const newTransaction = await prisma.transaction.create({
      data: {
        ...values,
        userId,
      },
    });
    return c.json(newTransaction);
  })
  .delete('/:id', async (c) => {
    const id = c.req.param('id');
    const deletedTransaction = await prisma.transaction.delete({
      where: { id },
    });
    return c.json(deletedTransaction);
  });
