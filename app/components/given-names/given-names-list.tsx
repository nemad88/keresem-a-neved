import { cn } from "@/lib/utils";
import { GivenName } from "@prisma/client";
import { IoHeartDislikeOutline, IoHeartOutline } from "react-icons/io5";

const GivenNamesList = ({
  givenNames,
  handleClickFavorite,
  handleClickDislike,
  listType,
}: {
  givenNames: GivenName[];
  handleClickFavorite?: (givenNameId: string) => Promise<void>;
  handleClickDislike?: (givenNameId: string) => Promise<void>;
  listType: "normal" | "favorites" | "disliked" | "mutual";
}) => {
  return (
    <ul className="flex flex-row gap-2 flex-wrap ">
      {givenNames.map((name) => (
        <li
          key={name.id}
          className={cn(
            "bg-slate-50 rounded-2xl gap-2 p-1 relative overflow-hidden	"
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

          <div className="relative flex flex-row gap-2 justify-center items-center bg-white p-2  rounded-2xl">
            <div>{name.name}</div>
            <div className={cn("flex gap-2 items-center")}>
              {handleClickFavorite && (
                <div
                  className={cn("flex items-center")}
                  onClick={() => handleClickFavorite(name.id)}
                >
                  <IoHeartOutline />
                </div>
              )}
              {handleClickDislike && (
                <div
                  className={cn()}
                  onClick={() => handleClickDislike(name.id)}
                >
                  <IoHeartDislikeOutline />
                </div>
              )}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GivenNamesList;
