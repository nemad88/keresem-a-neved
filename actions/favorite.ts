"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";

export const toggleFavorite = async (nameId: string) => {
  const session = await auth();
  const userId = session?.user.id;

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
    await prisma.favorite.delete({
      where: {
        id: existingFavorite.id,
      },
    });
    return { deleted: true };
  }

  const favorite = await prisma.favorite.create({
    data: {
      userId,
      nameId,
    },
  });

  return favorite;
};
