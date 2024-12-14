import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const getMyFavoriteNames = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) {
    return null;
  }
  return await prisma.favorite.findMany({
    where: {
      userId,
    },
  });
};

export const getFavoriteById = async (userId?: string, nameId?: string) => {
  if (!userId || !nameId) {
    return null;
  }
  const existingFavorite = await prisma.favorite.findFirst({
    where: {
      userId,
      nameId,
    },
  });
  if (existingFavorite) {
    return existingFavorite;
  }
  return null;
};
