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

export const userRoute = new Hono().put("/", async (c) => {
  const { userId } = await verifyToken(c);
  const body = (await c.req.json()) as { currency: string };
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { ...body },
  });
  return c.json(updated);
});
