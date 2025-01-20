"use client";

import { setFavoriteGivenNameStatus } from "@/actions/favoriteGivenNames";

import { cn } from "@/lib/utils";
import { GivenNameStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import { Dispatch, SetStateAction, useState } from "react";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
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
  favorites: FavoriteGivenName[];
  disliked: FavoriteGivenName[];
  setFavorites?: Dispatch<SetStateAction<FavoriteGivenName[]>>;
  setDisliked?: Dispatch<SetStateAction<FavoriteGivenName[]>>;
  givenNames: GivenName[];
};

export function GivenNamesColumn({
  favorites,
  setFavorites,
  disliked,
  setDisliked,
  givenNames,
}: TGivenNamesProps) {
  const session = useSession();

  const [showHidden, setShowHidden] = useState(false);
  const [closed, setClosed] = useState(false);

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
    <div className={cn("flex-1 relative")}>
      {closed ? (
        <IoCaretDown
          className="absolute top-0 right-0"
          onClick={() => setClosed((prev) => !prev)}
        />
      ) : (
        <IoCaretUp
          onClick={() => setClosed((prev) => !prev)}
          className="absolute top-0 right-0"
        />
      )}
      <div>Number of names: {givenNames?.length}</div>
      <h1 className="text-2xl font-bold">Favorites</h1>
      <GivenNamesList
        listType="favorites"
        givenNames={givenNames.filter((name) => {
          return favorites.some((favorite) => favorite.givenNameId === name.id);
        })}
        handleClickDislike={handleClickDislike}
        handleClickFavorite={handleClickFavorite}
      />
      {setFavorites && (
        <>
          <input
            type="checkbox"
            name="show-hidden"
            checked={showHidden}
            onChange={() => setShowHidden(!showHidden)}
          />
          <label>Show hidden</label>
        </>
      )}
      <h1 className="text-2xl font-bold">
        All {givenNames[0]?.gender} given names
      </h1>
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
      />
    </div>
  );
}
