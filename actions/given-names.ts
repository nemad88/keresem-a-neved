import { prisma } from "@/lib/prisma";

export const deleteAllGivenNames = async () => {
  await prisma.givenName.deleteMany();
  return;
};
