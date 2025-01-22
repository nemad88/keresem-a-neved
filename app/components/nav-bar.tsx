"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RoleGate } from "./auth/role-gate";

const NavBar = () => {
  const session = useSession();
  const pathname = usePathname();

  if (session.status === "loading") {
    return (
      <div className="h-10 flex justify-between p-4">
        <div className="h-10 w-20 bg-gray-100 animate-pulse rounded-3xl"></div>
        <div className="h-10 w-20 bg-gray-100 animate-pulse rounded-3xl"></div>
        <div className="h-10 w-20 bg-gray-100 animate-pulse rounded-3xl"></div>
      </div>
    );
  }

  return (
    <div className="h-auto w-full bg-slate-100 left-0 top-0 flex justify-between p-4 fixed z-50 items-center">
      <ul>
        <RoleGate allowedRole={"ADMIN"}>
          <Link href={pathname === "/admin" ? "/" : "/admin"}>
            <li className="font-black hover:underline">
              {pathname === "/admin" ? "Back" : "Admin"}
            </li>
          </Link>
        </RoleGate>
      </ul>
      <div className="flex gap-8 justify-center items-center">
        <Link href={"#male"} className="cursor-pointer underline">
          Boys
        </Link>
        <div className="text-2xl">
          {session ? session.data?.user.name?.split(" ")[0] : ""}
        </div>
        <Link href={"#female"} className="cursor-pointer underline">
          Girls
        </Link>
      </div>
      {session.data ? (
        <button className="underline" onClick={() => signOut()}>
          Logout
        </button>
      ) : (
        <form
          action={async () => {
            await signIn("google");
          }}
        >
          <button>Login</button>
        </form>
      )}
    </div>
  );
};

export default NavBar;
