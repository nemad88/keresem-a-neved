"use client";

import Filter from "@/app/components/filter-bar";
import { GivenNamesList } from "@/app/components/given-names-list";
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

type Filters = {
  onlyFavorites: boolean;
  selectedLetter: string | undefined;
};

const GivenNamesSection = ({
  favoriteGivenNames,
  dislikedGivenNames,
  givenNames,
}: TGivenNamesProps) => {
  const [filters, setFilters] = useState<Filters>({
    onlyFavorites: false,
    selectedLetter: undefined,
  });
  const [favorites, setFavorites] = useState(favoriteGivenNames);
  const [disliked, setDisliked] = useState(dislikedGivenNames);

  return (
    <div className="flex flex-col gap-8">
      <Filter filters={filters} setFilters={setFilters} />
      <section className="flex flex-row gap-8">
        {givenNames.male && (
          <GivenNamesList
            favorites={favorites}
            setFavorites={setFavorites}
            disliked={disliked}
            setDisliked={setDisliked}
            givenNames={givenNames.male.filter(
              (name) =>
                !filters.onlyFavorites ||
                favorites.some((favorite) => favorite.givenNameId === name.id)
            )}
            filters={filters}
          />
        )}
        {givenNames.female && (
          <GivenNamesList
            favorites={favorites}
            setFavorites={setFavorites}
            disliked={disliked}
            setDisliked={setDisliked}
            givenNames={givenNames.female.filter(
              (name) =>
                !filters.onlyFavorites ||
                favorites.some((favorite) => favorite.givenNameId === name.id)
            )}
            filters={filters}
          />
        )}
      </section>
    </div>
  );
};

export default GivenNamesSection;
