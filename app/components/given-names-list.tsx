"use client";

import { setFavoriteGivenNameStatus } from "@/actions/favoriteGivenNames";
import Pagination from "@/app/components/pagination";
import { cn } from "@/lib/utils";
import { GivenNameStatus } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { IoHeartDislikeOutline, IoHeartOutline } from "react-icons/io5";

type Filters = {
  onlyFavorites: boolean;
  selectedLetter: string | undefined;
};

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
  filters: Filters;
};

export function GivenNamesList({
  favorites,
  setFavorites,
  disliked,
  setDisliked,
  givenNames,
  filters,
}: TGivenNamesProps) {
  const [showHidden, setShowHidden] = useState(false);
  const session = useSession();

  const getTotalPages = useCallback(
    (givenNames: GivenName[], perPage: number) => {
      const totalNames = filters.onlyFavorites
        ? givenNames.filter((name) =>
            favorites.some((favorite) => favorite.givenNameId === name.id)
          ).length
        : givenNames?.length
          ? givenNames.length
          : 0;

      return Math.ceil(totalNames / perPage);
    },
    [filters.onlyFavorites, favorites]
  );

  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(
    givenNames ? getTotalPages(givenNames, perPage) : 0
  );

  useEffect(() => {
    const newTotalPage = getTotalPages(givenNames, perPage);

    if (newTotalPage === 0) {
      setPage(1);
    }

    if (page > newTotalPage) {
      setPage(1);
    }

    setTotalPages(newTotalPage);
  }, [getTotalPages, givenNames, page, perPage]);

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
    <div className="flex-1">
      <div>Number of names: {givenNames?.length}</div>
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

      <ul className="flex flex-row gap-2 flex-wrap ">
        {givenNames
          .slice((page - 1) * perPage, (page - 1) * perPage + perPage)
          .map((name) => (
            <li
              key={name.id}
              className={cn(
                !showHidden && isDisliked(name.id)
                  ? "hidden"
                  : "flex flex-col relative",
                "w-[260px] h-[100px] justify-center items-center gap-2 text-3xl p-4 rounded-xl",
                isDisliked(name.id) && "grayscale",
                name.gender === "female"
                  ? `bg-gradient-to-r from-violet-200 to-pink-200`
                  : `bg-gradient-to-r from-teal-200 to-teal-500`,
                name.gender === "female" &&
                  isFavorite(name.id) &&
                  "font-bold  underline",
                name.gender === "male" &&
                  isFavorite(name.id) &&
                  "font-bold  underline"
              )}
            >
              <div>{name.name}</div>

              {setFavorites && (
                <>
                  <div
                    className={cn(
                      "cursor-pointer",
                      isFavorite(name.id)
                        ? "absolute bottom-3 right-3 text-2xl grayscale-0 scale-125 transform transition-transform duration-500 hover:scale-150"
                        : "absolute bottom-3 right-3 text-2xl grayscale transform transition-transform duration-500 hover:scale-125"
                    )}
                    onClick={() => handleClickFavorite(name.id)}
                  >
                    <IoHeartOutline />
                  </div>
                  <div
                    className={cn(
                      "cursor-pointer",
                      isDisliked(name.id)
                        ? "absolute top-3 right-3 text-2xl grayscale-0 scale-125 transform transition-transform duration-500 hover:scale-y-150"
                        : "absolute top-3 right-3 text-2xl grayscale transform transition-transform duration-500 hover:scale-125"
                    )}
                    onClick={() => handleClickDislike(name.id)}
                  >
                    <IoHeartDislikeOutline />
                  </div>
                </>
              )}
            </li>
          ))}
      </ul>
      <Pagination
        setPage={setPage}
        page={page}
        totalPages={totalPages}
        setPerPage={setPerPage}
      />
    </div>
  );
}
