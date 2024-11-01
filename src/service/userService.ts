import prisma from "@prisma/index";
import { CreateUserInput } from "@schema/userSchema";
import argon2 from "argon2";

export async function createUser(
  input: CreateUserInput
) {
  return await prisma.user.create({
    data: {
      firstName: input.firstName,
      lastName: input.lastName,
      email: input.email,
      password: await argon2.hash(input.password),
    },
  });
}

export async function findUserById(id: number) {
  return await prisma.user.findUnique({
    where: {
      id
    },
  });
}

export async function findUserByEmail(email: string) {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
}
