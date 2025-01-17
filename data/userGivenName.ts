import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GivenNameStatus } from "@prisma/client";

export async function getFavoriteGivenNames() {
  const session = await auth();

  if (!session?.user.userId) {
    return [];
    // throw new Error("User not authenticated");
  }

  return prisma.userGivenName.findMany({
    where: {
      AND: [{ userId: session?.user.userId }, { status: GivenNameStatus.LIKE }],
    },
  
    include: {
      givenName: true,
    },
  });
}

export async function getDislikedGivenNames() {
  const session = await auth();

  if (!session?.user.userId) {
    return [];
    // throw new Error("User not authenticated");
  }

  return prisma.userGivenName.findMany({
    where: {
      AND: [
        { userId: session?.user.userId },
        { status: GivenNameStatus.DISLIKE },
      ],
    },
    include: {
      givenName: true,
    },
  });
}

export const getMutualFavoriteGivenNames = async (
  userOneId: string | undefined,
  userTwoId: string | undefined
) => {
  // const session = await auth();

  // if (!session?.user.userId) {
  //   return [];
  //   // throw new Error("User not authenticated");
  // }

  if (!userOneId || !userTwoId) {
    return [];
  }

  const myFavorites = await prisma.userGivenName.findMany({
    where: { AND: [{ userId: userOneId }, { status: GivenNameStatus.LIKE }] },
    select: { givenNameId: true },
  });

  const friendsFavorites = await prisma.userGivenName.findMany({
    where: { AND: [{ userId: userTwoId }, { status: GivenNameStatus.LIKE }] },
    select: { givenNameId: true },
  });

  const myFavoriteIds = myFavorites.map((fav) => fav.givenNameId);
  const friendFavoriteIds = friendsFavorites.map((fav) => fav.givenNameId);

  const mutualFavoriteIds = myFavoriteIds.filter((id) =>
    friendFavoriteIds.includes(id)
  );

  const mutualFavorites = await prisma.givenName.findMany({
    where: {
      id: { in: mutualFavoriteIds },
    },
  });

  return mutualFavorites;
};
