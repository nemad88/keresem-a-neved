"use client";

import Filter from "@/app/components/filter-bar";
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
    <div className="flex flex-col gap-8">
      <Filter />
      <section className="flex flex-row gap-8">
        {givenNames.male && (
          <GivenNamesColumn
            favorites={favorites}
            setFavorites={setFavorites}
            disliked={disliked}
            setDisliked={setDisliked}
            givenNames={getFilteredList(givenNames.male)}
          />
        )}
        {givenNames.female && (
          <GivenNamesColumn
            favorites={favorites}
            setFavorites={setFavorites}
            disliked={disliked}
            setDisliked={setDisliked}
            givenNames={getFilteredList(givenNames.female)}
          />
        )}
      </section>
    </div>
  );
};

export default GivenNamesSection;
