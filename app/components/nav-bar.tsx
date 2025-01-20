"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RoleGate } from "./auth/role-gate";

const NavBar = () => {
  const session = useSession();
  const pathname = usePathname();

  return (
    <div className="flex justify-between p-4">
      <ul>
        <RoleGate allowedRole={"ADMIN"}>
          <Link href={pathname === "/admin" ? "/" : "/admin"}>
            <li className="font-black hover:underline">
              {pathname === "/admin" ? "Back" : "Admin"}
            </li>
          </Link>
        </RoleGate>
      </ul>
      <div>{session ? session.data?.user.name?.split(" ")[0] : ""}</div>
      {session.data ? (
        <button onClick={() => signOut()}>Logout</button>
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
