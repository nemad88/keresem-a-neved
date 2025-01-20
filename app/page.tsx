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
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
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
    </div>
  );
}
