import { auth } from "@/auth";
import { getFriends } from "@/data/friend";
import { getGivenNames } from "@/data/givenName";
import {
  getDislikedGivenNames,
  getFavoriteGivenNames,
} from "@/data/userGivenName";
import Friends from "./components/friends-section";
import GivenNamesSection from "./components/given-names-section";

export default async function Home() {
  const session = await auth();
  const femaleGivenNames = await getGivenNames("female");
  const maleGivenNames = await getGivenNames("male");
  const favoriteGivenNames = await getFavoriteGivenNames();
  const dislikedGivenNames = await getDislikedGivenNames();
  const friends = await getFriends(session?.user.id);

  console.log("female", JSON.stringify(femaleGivenNames));
  console.log("male", maleGivenNames?.length);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Friends friends={friends} />
        <GivenNamesSection
          givenNames={{
            male: maleGivenNames,
            female: femaleGivenNames,
          }}
          favoriteGivenNames={favoriteGivenNames}
          dislikedGivenNames={dislikedGivenNames}
        />
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        Footer
      </footer>
    </div>
  );
}
