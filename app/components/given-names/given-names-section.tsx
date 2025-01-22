"use client";

import { GivenNamesColumn } from "@/app/components/given-names/given-names-column";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

type GivenName = {
  name: string;
  id: string;
  gender: string;
};

type TGivenNamesProps = {
  favoriteGivenNames: {
    givenNameId: string;
    userId: string;
  }[];
  dislikedGivenNames: {
    givenNameId: string;
    userId: string;
  }[];
  givenNames: {
    male: GivenName[] | undefined;
    female: GivenName[] | undefined;
  };
};

const GivenNamesSection = ({
  favoriteGivenNames,
  dislikedGivenNames,
  givenNames,
}: TGivenNamesProps) => {
  const [favorites, setFavorites] = useState(favoriteGivenNames);
  const [disliked, setDisliked] = useState(dislikedGivenNames);

  const filters = useAppSelector((state) => state.filter);

  const getFilteredList = (givenNames: GivenName[]) => {
    return givenNames.filter(() => {
      return !filters.onlyFavorites;
    });
  };

  return (
    <div className="w-full flex flex-col gap-8">
      {/* <Filter /> */}
      <section className="flex flex-col lg:flex-row gap-8">
        <div className="bg-pink-200/50 p-8 rounded-2xl flex-1">
          {givenNames.female && (
            <GivenNamesColumn
              id={"female"}
              favorites={favorites}
              setFavorites={setFavorites}
              disliked={disliked}
              setDisliked={setDisliked}
              givenNames={getFilteredList(givenNames.female)}
            />
          )}
        </div>
        {givenNames.male && (
          <div className="bg-blue-200/50 p-8 rounded-2xl flex-1">
            <GivenNamesColumn
              id={"male"}
              favorites={favorites}
              setFavorites={setFavorites}
              disliked={disliked}
              setDisliked={setDisliked}
              givenNames={getFilteredList(givenNames.male)}
            />
          </div>
        )}
      </section>
    </div>
  );
};

export default GivenNamesSection;
