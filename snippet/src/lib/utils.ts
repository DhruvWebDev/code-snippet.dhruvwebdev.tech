import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import jsonWebtoken from 'jsonwebtoken';
import bcrypt from 'bcryptjs'; // Assuming bcryptjs for password hashing
import { prisma } from "./prisma-client";
import { cookies } from "next/headers";
const jwtToken = process.env.JWT_SECRET;
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const addJWTToHeader = (token: string) => {
  cookies.set('token', token, { httpOnly: true, secure: true, sameSite: 'strict' });
}

export const createJWTToken = (username: string) => {
  return jsonWebtoken.sign({ username }, jwtToken, { expiresIn: '1h' });
}

export const getUser = async ({ username, password }: { username: string, password: string }) => {
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash password with bcrypt
  const existingUser = await prisma.user.findUnique({
    where: { username, password:hashedPassword },
  });

  if (existingUser && bcrypt.compareSync(password, existingUser.password)) {
    return existingUser;
  }

  return null;
}
getUser({ username: 'admin', password: 'admin' });

export const addUser = async ({ username, password }: { username: string, password: string }) => {
  const hashedPassword = bcrypt.hashSync(password, 10); // Hash password with bcrypt
  const newUser = await prisma.user.create({
    data: { username, password: hashedPassword },
  });

  return newUser;
}
