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
    setMutualFavoriteGivenNames(friends);
  };

  return (
    <div className="flex flex-col gap-8">
      <GivenNamesList givenNames={mutualFavoriteGivenNames} listType="mutual" />
      <div className="flex justify-center text-sm">
        <button onClick={getFriends} className="flex items-center text-2xl">
          Refresh friends
          <IoRefresh />
        </button>
      </div>
    </div>
  );
};

export default MutualFavorites;
