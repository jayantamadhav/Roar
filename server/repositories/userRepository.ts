import { CreateUserRequest, IUser } from "~/types/IUser";
import prisma from "~/server/database/client";

export async function getUserByEmail(email: string): Promise<IUser | null> {
  return await prisma.user.findUnique({
    where: {
      email: email,
    },
    select: {
      id: true,
      email: true,
      password: true,
      role: true,
    },
  });
}

export async function createUser(data: CreateUserRequest) {
  const user = prisma.user.create({
    data: {
      email: data.email,
      password: data.password,
    },
  });
  return user;
}
