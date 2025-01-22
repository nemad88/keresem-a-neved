import { cn } from "@/lib/utils";
import { GivenName } from "@prisma/client";
import { useState } from "react";
import {
  IoCaretDown,
  IoCaretUp,
  IoHeartDislikeOutline,
  IoHeartOutline,
} from "react-icons/io5";

const GivenNamesList = ({
  givenNames,
  handleClickFavorite,
  handleClickDislike,
  title,
  listType,
}: {
  givenNames: GivenName[];
  handleClickFavorite?: (givenNameId: string) => Promise<void>;
  handleClickDislike?: (givenNameId: string) => Promise<void>;
  title: string;
  listType: "normal" | "favorites" | "disliked" | "mutual";
}) => {
  const [closed, setClosed] = useState(true);
  return (
    <div className={cn("flex flex-col gap-2 pb-8")}>
      <div className="w-full h-12 flex justify-between items-center pr-2">
        <h1 className="text-2xl font-bold">{title}</h1>
        {closed ? (
          <IoCaretDown
            className="z-50 text-4xl"
            onClick={() => setClosed((prev) => !prev)}
          />
        ) : (
          <IoCaretUp
            onClick={() => setClosed((prev) => !prev)}
            className="z-50 text-4xl"
          />
        )}
      </div>
      <ul
        className={cn(
          closed ? "hidden" : "flex",
          "flex-col gap-2 flex-wrap text-2xl"
        )}
      >
        {givenNames.map((name) => (
          <li
            key={name.id}
            className={cn(
              "bg-slate-50 rounded-2xl gap-8 p-1 relative overflow-hidden flex-1"
            )}
          >
            <div
              className={cn(
                "absolute inset-0 rounded-2xl",
                listType === "mutual" &&
                  "bg-gradient-to-r from-green-500 via-emerald-500 to-sky-500",
                listType === "favorites" &&
                  "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
              )}
            ></div>

            <div className="relative flex flex-row gap-2 justify-between items-center bg-white p-2  rounded-2xl">
              <div>{name.name}</div>
              <div className={cn("flex gap-8 items-center text-4xl")}>
                {handleClickDislike && (
                  <div
                    className={cn()}
                    onClick={() => handleClickDislike(name.id)}
                  >
                    <IoHeartDislikeOutline />
                  </div>
                )}
                {handleClickFavorite && (
                  <div
                    className={cn("flex items-center")}
                    onClick={() => handleClickFavorite(name.id)}
                  >
                    <IoHeartOutline />
                  </div>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GivenNamesList;
