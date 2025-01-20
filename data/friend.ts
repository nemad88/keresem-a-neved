import { prisma } from "@/lib/prisma";
import { FriendStatus } from "@prisma/client";
export const getFriends = async (userid: string | undefined) => {
  console.log("userid", userid);

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
    include: {
      sender: true,
      receiver: true,
    },
  });
};
