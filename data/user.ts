import { prisma } from "@/lib/prisma";

export const getUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: {
      email,
    },
  });
};
export const getUserById = async (id?: string) => {
  if (!id) return null;
  return await prisma.user.findUnique({
    where: {
      id,
    },
  });
};
