"use client";
import { GivenName } from "@prisma/client";
import { useState } from "react";
import { IoRefresh } from "react-icons/io5";
import GivenNamesList from "../given-names/given-names-list";

const MutualFavorites = ({
  mutualFavoriteGivenNamesProp,
  refetchFriends,
  title,
}: {
  mutualFavoriteGivenNamesProp: GivenName[];
  refetchFriends: () => Promise<
    {
      name: string;
      id: string;
      gender: string;
    }[]
  >;
  title: string;
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
      <div className="bg-green-200 p-8 rounded-2xl flex-1">
        <GivenNamesList
          givenNames={mutualFavoriteGivenNames}
          listType="mutual"
          title={title}
        />
      </div>
      <div className="flex justify-center text-sm">
        <button onClick={getFriends} className="flex items-center text-xl font-bold cursor-pointer">
          Refresh friends
          <IoRefresh />
        </button>
      </div>
    </div>
  );
};

export default MutualFavorites;
