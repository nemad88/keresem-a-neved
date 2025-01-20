import { auth } from "@/auth";
import { getMutualFavoriteGivenNames } from "@/data/userGivenName";
import { Friend, User } from "@prisma/client";
import MutualFavorites from "./mutual-favorites";

type Friends = (Friend & { receiver: User; sender: User })[];

const FriendsSection = async ({ friends }: { friends: Friends }) => {
  const session = await auth();

  const friendPairs = friends.map((friend) => {
    if (friend.senderId === session?.user.userId) {
      return friend.receiver;
    } else {
      return friend.sender;
    }
  });

  const mutualPromises = friendPairs.map((friend) =>
    getMutualFavoriteGivenNames(session?.user.userId, friend.id)
  );

  const mutuals = await Promise.all(mutualPromises);

  const refetchFriends = async (sender: string, receiver: string) => {
    "use server";
    const mutual = await getMutualFavoriteGivenNames(sender, receiver);
    return mutual;
  };

  if (friends.length === 0) {
    return null;
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {friends.map((friend, index) => {
        if (mutuals[index].length === 0) {
          return null;
        }
        return (
          <div className="flex flex-col gap-8 flex-1" key={friend.id}>
            <h1 className="text-2xl font-bold">
              Mutual favorite names with{" "}
              <span className="underline">
                {friend.senderId === session?.user.userId
                  ? friend.receiver.name
                  : friend.sender.name}
              </span>
            </h1>

            <MutualFavorites
              mutualFavoriteGivenNamesProp={mutuals[index]}
              refetchFriends={refetchFriends.bind(
                null,
                friend.senderId,
                friend.receiverId
              )}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FriendsSection;
