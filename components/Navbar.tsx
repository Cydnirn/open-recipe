"use client";

import { Button } from "@aws-amplify/ui-react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AmplifyComp from "./Amplify";

export default function Navbar() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser>();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getCurrentUser();
        console.log(userData);
        setUser(userData);
      } catch (err) {
        console.error("Error fetching user");
      }
    };
    fetchUser();
  }, [getCurrentUser]);

  return (
    <nav className="fixed top-0 z-10 flex h-5 w-screen transform items-center justify-end border-2 border-b border-slate-300 bg-default px-5 py-5">
      <AmplifyComp />
      {user ? (
        <h1 className="cursor-pointer">Hello {user.signInDetails?.loginId}</h1>
      ) : (
        <Button
          onClick={() => router.push("/login")}
          className="primary-button"
          variation="primary"
        >
          Sign In
        </Button>
      )}
    </nav>
  );
}
