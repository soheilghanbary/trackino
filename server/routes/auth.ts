import prisma from '@/server/db';
import { compare, hash } from 'bcrypt';
import { Hono } from 'hono';
import { getCookie, setCookie } from 'hono/cookie';
import { sign, verify } from 'hono/jwt';

const JWT_SECRET = 'your_secret_key';
const SALT_ROUNDS = 10;

export const authRoute = new Hono()
  .post('/register', async (c) => {
    const body = await c.req.json();
    // check email exist on db
    const emailExist = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (emailExist) return c.json({ error: 'Email already exist' }, 400);
    // step 1: hash the password
    const hashedPassword = await hash(body.password, SALT_ROUNDS);
    // step 2: create the user
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
      },
    });
    // Step 3: Sign a JWT token
    const token = await sign({ userId: user.id }, JWT_SECRET);
    // Step 4: Set the JWT token in a cookie
    setCookie(c, 'auth_token', token);
    // step 5: return the user
    return c.json({ msg: 'your Account has been Created!', user });
  })
  .post('/login', async (c) => {
    const body = await c.req.json();
    // Step 1: Check if the user exists
    const user = await prisma.user.findUnique({
      where: { email: body.email },
    });
    if (!user) {
      return c.json({ error: 'Invalid email or password' }, 400);
    }
    // Step 2: Compare the provided password with the hashed password in the database
    const isPasswordValid = await compare(body.password, user.password);
    if (!isPasswordValid) {
      return c.json({ error: 'Invalid email or password' }, 400);
    }
    // Step 3: Sign a JWT token
    const token = await sign({ userId: user.id }, JWT_SECRET);
    // Step 4: Set the JWT token in a cookie
    setCookie(c, 'auth_token', token);
    // Step 5: Return a success message
    return c.json({ msg: 'Logged in successfully!' });
  })
  .get('/user', async (c) => {
    // step 1: get token from cookie and check token
    const token = getCookie(c, 'auth_token');
    if (!token) return c.json({ error: 'Unauthorized' }, 401);
    const payload = (await verify(token, JWT_SECRET)) as { userId: string };
    // get user by userId
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, currency: true },
    });
    return c.json(user);
  });
