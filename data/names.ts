import { prisma } from "@/lib/db";

export const getAllNames = async () => {
  return await prisma.name.findMany();
};
