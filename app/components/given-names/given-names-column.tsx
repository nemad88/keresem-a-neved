"use client";

import { setFavoriteGivenNameStatus } from "@/actions/favoriteGivenNames";

import { cn } from "@/lib/utils";
import { GivenNameStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import GivenNamesList from "./given-names-list";

type GivenName = {
  name: string;
  id: string;
  gender: string;
};

type FavoriteGivenName = {
  givenNameId: string;
  userId: string;
};

type TGivenNamesProps = {
  id: string;
  favorites: FavoriteGivenName[];
  disliked: FavoriteGivenName[];
  setFavorites?: Dispatch<SetStateAction<FavoriteGivenName[]>>;
  setDisliked?: Dispatch<SetStateAction<FavoriteGivenName[]>>;
  givenNames: GivenName[];
};

export function GivenNamesColumn({
  id,
  favorites,
  setFavorites,
  disliked,
  setDisliked,
  givenNames,
}: TGivenNamesProps) {
  const session = useSession();
  const [showHidden, setShowHidden] = useState(false);

  const isFavorite = (givenNameId: string) => {
    return favorites?.some((favorite) => favorite.givenNameId === givenNameId);
  };

  const isDisliked = (givenNameId: string) => {
    return disliked?.some((dislike) => dislike.givenNameId === givenNameId);
  };

  const handleClickFavorite = async (givenNameId: string) => {
    if (!setFavorites || !setDisliked) return;

    if (isFavorite(givenNameId)) {
      setFavorites((prev) =>
        prev.filter((favorite) => favorite.givenNameId !== givenNameId)
      );
      await setFavoriteGivenNameStatus(givenNameId, GivenNameStatus.NEUTRAL);
    } else {
      if (session.data?.user?.userId) {
        setFavorites((prev) => [
          ...prev,
          { givenNameId, userId: session.data?.user?.userId },
        ]);
        setDisliked((prev) =>
          prev.filter((dislike) => dislike.givenNameId !== givenNameId)
        );
      }
      await setFavoriteGivenNameStatus(givenNameId, GivenNameStatus.LIKE);
    }
  };

  const handleClickDislike = async (givenNameId: string) => {
    if (!setDisliked || !setFavorites) return;

    if (isDisliked(givenNameId)) {
      setDisliked((prev) =>
        prev.filter((dislike) => dislike.givenNameId !== givenNameId)
      );
      await setFavoriteGivenNameStatus(givenNameId, GivenNameStatus.NEUTRAL);
    } else {
      if (session.data?.user?.userId) {
        setDisliked((prev) => [
          ...prev,
          { givenNameId, userId: session.data?.user?.userId },
        ]);
        setFavorites((prev) =>
          prev.filter((favorite) => favorite.givenNameId !== givenNameId)
        );
        await setFavoriteGivenNameStatus(givenNameId, GivenNameStatus.DISLIKE);
      }
    }
  };

  return (
    <div className={cn("flex-1 relative")} id={id}>
      <div className="flex justify-start items-center gap-2">
        <input
          type="checkbox"
          name="show-hidden"
          checked={showHidden}
          onChange={() => setShowHidden(!showHidden)}
        />
        <label>Show hidden</label>
      </div>

      {showHidden && (
        <GivenNamesList
          listType="disliked"
          givenNames={givenNames.filter((name) => {
            return favorites.some(
              (favorite) => favorite.givenNameId === name.id
            );
          })}
          handleClickDislike={handleClickDislike}
          handleClickFavorite={handleClickFavorite}
          title={`Disliked ${givenNames[0]?.gender === "female" ? "girl" : "boy"} names`}
        />
      )}
      <GivenNamesList
        listType="favorites"
        givenNames={givenNames.filter((name) => {
          return favorites.some((favorite) => favorite.givenNameId === name.id);
        })}
        handleClickDislike={handleClickDislike}
        handleClickFavorite={handleClickFavorite}
        title={`Favorite ${givenNames[0]?.gender === "female" ? "girl" : "boy"} names`}
      />
      <GivenNamesList
        listType="normal"
        givenNames={givenNames
          .filter((name) => {
            return !favorites.some(
              (favorite) => favorite.givenNameId === name.id
            );
          })
          .filter((name) => {
            return !disliked.some((dislike) => dislike.givenNameId === name.id);
          })}
        handleClickDislike={handleClickDislike}
        handleClickFavorite={handleClickFavorite}
        title={`All ${givenNames[0]?.gender} given names`}
      />
    </div>
  );
}
