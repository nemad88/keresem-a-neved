import FavoriteButton from "./favorite-button";

type TProps = {
  names: {
    name: string;
    id: string;
    gender: string;
  }[];
  userFavorites:
    | {
        nameId: string;
        id: string;
        userId: string;
        createdAt: Date;
      }[]
    | null;
};

const NameList = ({ names, userFavorites }: TProps) => {
  return (
    <div className="flex flex-wrap gap-6">
      {names.slice(0, 10).map((name) => {
        const style = name.gender === "female" ? "bg-pink-200" : "bg-blue-200";
        const isFavorite = userFavorites?.some(
          (favorite) => favorite.nameId === name.id,
        );
        return (
          <div className={`${style} flex w-auto rounded-lg p-4`} key={name.id}>
            <div>{name.name}</div>

            <FavoriteButton nameId={name.id} isFavoriteInitial={isFavorite} />
          </div>
        );
      })}
    </div>
  );
};

export default NameList;
