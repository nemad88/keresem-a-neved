import { auth, signOut } from "@/auth";
import Social from "@/components/auth/social";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Navigation = async () => {
  const session = await auth();
  return (
    <>
      {session ? (
        <div className="flex justify-between">
          <ul className="flex gap-4 font-bold uppercase">
            <li className="hover:underline">
              <Link className="" href={"/favorites"}>
                Favorites
              </Link>
            </li>
            <li className="hover:underline">
              <Link href={"/names"}>Names</Link>
            </li>
          </ul>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button variant={"destructive"} type="submit">
              Logout
            </Button>
          </form>
        </div>
      ) : (
        <>
          {/* <Button variant={"link"}>
            <Link href={"/auth/login"}>Login</Link>
          </Button>
          <Button variant={"link"}>
            <Link href={"/auth/register"}>Register</Link>
          </Button> */}
          <Social />
        </>
      )}
    </>
  );
};

export default Navigation;
