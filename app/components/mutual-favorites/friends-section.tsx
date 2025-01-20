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

  console.log("friends", friends);

  return (
    <>
      {friends.map((friend, index) => (
        <div key={friend.id}>
          <h1>
            {friend.senderId === session?.user.userId
              ? friend.receiver.name
              : friend.sender.name}
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
      ))}
    </>
  );
};

export default FriendsSection;
