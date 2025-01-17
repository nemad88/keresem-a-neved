"use client";
import { GivenName } from "@prisma/client";
import { useState } from "react";
import { GivenNamesList } from "./given-names-list";

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
    <div>
      <h1>Friends</h1>
      <GivenNamesList
        givenNames={mutualFavoriteGivenNames}
        filters={{
          onlyFavorites: true,
          selectedLetter: undefined,
        }}
        favorites={[]}
      />
      <button onClick={getFriends}>⟳</button>
    </div>
  );
};

export default MutualFavorites;
