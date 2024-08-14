import type { Context } from 'hono';
import { getCookie } from 'hono/cookie';
import { verify } from 'hono/jwt';

const JWT_SECRET = 'your_secret_key';

export async function verifyToken(c: Context) {
  const token = getCookie(c, 'auth_token');
  if (!token) throw new Error('Unauthorized');
  const { userId } = (await verify(token, JWT_SECRET)) as { userId: string };
  return { userId };
}
