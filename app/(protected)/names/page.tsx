import FavoriteList from "@/components/name-list";
import { getMyFavoriteNames } from "@/data/favorites";
import { getAllNames } from "@/data/names";

const Names = async () => {
  const names = await getAllNames();
  const userFavorites = await getMyFavoriteNames();

  return (
    <div>
      <h1>Favorites</h1>
      <FavoriteList names={names} userFavorites={userFavorites} />
    </div>
  );
};

export default Names;
