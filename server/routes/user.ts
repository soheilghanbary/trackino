import { verifyToken } from '@/server/lib/token';
import { Hono } from 'hono';
import prisma from '../db';

export const userRoute = new Hono().put('/', async (c) => {
  const { userId } = await verifyToken(c);
  const body = (await c.req.json()) as { currency: string };
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { ...body },
  });
  return c.json(updated);
});
