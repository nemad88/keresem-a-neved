"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const addFriend = async (senderId: string, receiverId: string) => {
  const session = await auth();

  if (!session?.user.userId) {
    throw new Error("User not authenticated");
  }

  return prisma.friend.create({
    data: {
      senderId,
      receiverId,
    },
  });
};
