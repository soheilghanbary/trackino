import { verifyToken } from '@/server/lib/token';
import { Hono } from 'hono';
import prisma from '../db';

export const categoryRoute = new Hono()
  .get('/', async (c) => {
    const { type } = c.req.query() as { type: string };
    const { userId } = await verifyToken(c);
    const categories = await prisma.category.findMany({
      where: {
        userId,
        type,
      },
    });
    return c.json(categories);
  })
  .post('/', async (c) => {
    const { userId } = await verifyToken(c);
    const body = await c.req.json();
    const category = await prisma.category.create({
      data: {
        ...body,
        userId,
      },
    });
    return c.json({ msg: 'Create Category Successfully!', data: category });
  })
  .delete('/:id', async (c) => {
    const { userId } = await verifyToken(c);
    const { id } = c.req.param();
    const category = await prisma.category.delete({
      where: {
        id,
        userId,
      },
    });
    return c.json({ msg: 'Delete Category Successfully!', data: category });
  });
