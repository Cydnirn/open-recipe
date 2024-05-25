"use client";

import { Button } from "@aws-amplify/ui-react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AmplifyComp from "./Amplify";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user");
      }
    };
    fetchUser();
  }, [getCurrentUser]);

  return (
    <nav className="fixed top-0 z-10 flex h-12 w-screen transform items-center justify-center border-2 border-b border-slate-300 bg-default px-5 py-5">
      <AmplifyComp />
      <div className="flex w-[95%] items-center justify-end">
        {user ? (
          <div className="flex items-center gap-5 py-5">
            <Link href={"/new"}>
              <Button
                className="border-red-500 hover:border-red-800 hover:bg-red-800 hover:text-white"
                size="small"
              >
                Create Recipe
              </Button>
            </Link>
            <h1 className="cursor-pointer">
              Hello {user.signInDetails?.loginId}
            </h1>
          </div>
        ) : (
          <Button
            onClick={() => router.push("/login")}
            className="primary-button"
            variation="primary"
            size="small"
          >
            Sign In
          </Button>
        )}
      </div>
    </nav>
  );
}
