"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { GivenNameStatus } from "@prisma/client";

export async function setFavoriteGivenNameStatus(
  givenNameId: string,
  status: GivenNameStatus
) {
  const session = await auth();

  if (!session?.user.userId) {
    throw new Error("User not authenticated");
  }

  await prisma.userGivenName.upsert({
    where: { userId_givenNameId: { givenNameId, userId: session.user.userId } },
    update: { status },
    create: {
      givenNameId,
      userId: session?.user.userId,
      status,
    },
  });

  // await prisma.userGivenName.create({
  //   data: {
  //     givenNameId,
  //     userId: session?.user.userId,
  //     status,
  //   },
  // });
}
