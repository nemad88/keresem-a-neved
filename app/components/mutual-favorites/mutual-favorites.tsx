"use client";
import { GivenName } from "@prisma/client";
import { useState } from "react";
import { IoRefresh } from "react-icons/io5";
import GivenNamesList from "../given-names/given-names-list";

const MutualFavorites = ({
  mutualFavoriteGivenNamesProp,
  refetchFriends,
}: {
  mutualFavoriteGivenNamesProp: GivenName[];
  refetchFriends: () => Promise<
    {
      name: string;
      id: string;
      gender: string;
    }[]
  >;
}) => {
  const [mutualFavoriteGivenNames, setMutualFavoriteGivenNames] = useState(
    mutualFavoriteGivenNamesProp
  );

  const getFriends = async () => {
    const friends = await refetchFriends();
    console.log("get friends", friends);
    setMutualFavoriteGivenNames(friends);
  };

  return (
    <div>
      <div className="flex flex-row justify-between items-center gap-2">
        <h1 className="text-2xl font-bold">Mutual favorite names</h1>
        <button onClick={getFriends} className="flex items-center text-2xl">
          <IoRefresh />
        </button>
      </div>
      <GivenNamesList givenNames={mutualFavoriteGivenNames} listType="mutual" />
    </div>
  );
};

export default MutualFavorites;
