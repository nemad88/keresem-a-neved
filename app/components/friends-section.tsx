import { auth } from "@/auth";
import { getMutualFavoriteGivenNames } from "@/data/userGivenName";
import { Friend } from "@prisma/client";
import MutualFavorites from "./mutual-favorites";

const FriendsSection = async ({ friends }: { friends: Friend[] }) => {
  const session = await auth();
  const friendId = "cm5snjdg20003gvxcvdeu3d5a";

  const mutual = await getMutualFavoriteGivenNames(
    session?.user.userId,
    friendId
  );

  const refetchFriends = async () => {
    "use server";
    const mutual = await getMutualFavoriteGivenNames(
      session?.user.userId,
      friendId
    );
    return mutual;
  };

  console.log(mutual);
  return (
    <>
      {friends.map((friend) => (
        <div key={friend.id}>
          {friend.senderId} {friend.receiverId}
        </div>
      ))}
      <MutualFavorites
        mutualFavoriteGivenNamesProp={mutual}
        refetchFriends={refetchFriends}
      />
    </>
  );
};

export default FriendsSection;
