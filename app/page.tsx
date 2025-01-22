import { auth } from "@/auth";
import { getFriends } from "@/data/friend";
import { getGivenNames } from "@/data/givenName";
import {
  getDislikedGivenNames,
  getFavoriteGivenNames,
} from "@/data/userGivenName";
import GivenNamesSection from "./components/given-names/given-names-section";
import Friends from "./components/mutual-favorites/friends-section";

export default async function Home() {
  const session = await auth();

  console.log("session", session);

  const femaleGivenNames = await getGivenNames("female");
  const maleGivenNames = await getGivenNames("male");
  const favoriteGivenNames = await getFavoriteGivenNames();
  const dislikedGivenNames = await getDislikedGivenNames();
  const friends = await getFriends(session?.user.userId);

  return (
    <main className="relative flex flex-col gap-8  p-8 pt-10 rounded-2xl min-h-[100%]">
      {!session && <div>Please login</div>}
      {session && (
        <>
          <Friends friends={friends} />
          <GivenNamesSection
            givenNames={{
              male: maleGivenNames,
              female: femaleGivenNames,
            }}
            favoriteGivenNames={favoriteGivenNames}
            dislikedGivenNames={dislikedGivenNames}
          />
        </>
      )}
    </main>
  );
}
