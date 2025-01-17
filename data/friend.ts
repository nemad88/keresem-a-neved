import { prisma } from "@/lib/prisma";
import { FriendStatus } from "@prisma/client";
export const getFriends = async (userid: string | undefined) => {
  
  if (!userid) {
    return [];
  }
  
  return prisma.friend.findMany({
    where: {
      OR: [
        {
          AND: [{ senderId: userid }, { status: FriendStatus.ACCEPTED }],
        },
        {
          AND: [{ receiverId: userid }, { status: FriendStatus.ACCEPTED }],
        },
      ],
    },
  });
};
