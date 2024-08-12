import { createTransactionSchema } from "@/schemas/transaction";
import { zValidator } from "@hono/zod-validator";
import { type Context, Hono } from "hono";
import { getCookie } from "hono/cookie";
import { verify } from "hono/jwt";
import prisma from "../db";

const JWT_SECRET = "your_secret_key";

async function verifyToken(c: Context) {
  const token = getCookie(c, "auth_token");
  if (!token) throw new Error("Unauthorized");
  const { userId } = (await verify(token, JWT_SECRET)) as { userId: string };
  return { userId };
}

export const transactionRoute = new Hono()
  .get("/", async (c) => {
    const { userId } = await verifyToken(c);
    const transactions = await prisma.transaction.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return c.json(transactions);
  })
  .post("/", zValidator("json", createTransactionSchema), async (c) => {
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
  .delete("/:id", async (c) => {
    const id = c.req.param("id");
    const deletedTransaction = await prisma.transaction.delete({
      where: { id },
    });
    return c.json(deletedTransaction);
  });
