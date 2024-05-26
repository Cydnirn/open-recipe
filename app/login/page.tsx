"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import AmplifyComp from "@/components/Amplify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";

export default function Login() {
  const route = useRouter();

  return (
    <Authenticator.Provider>
      <AmplifyComp />
      <LoginContent route={route} />
    </Authenticator.Provider>
  );
}

const LoginContent = ({ route }: { route: AppRouterInstance }) => {
  const { authStatus } = useAuthenticator((c) => [c.authStatus]);

  useEffect(() => {
    if (authStatus === "authenticated") {
      route.replace("/home/recipes");
    }
  }, [authStatus, route]);

  return (
    <main className="flex h-screen w-full flex-col items-center bg-default">
      <section className="mt-10 flex h-screen w-full flex-col items-center">
        <div className="flex w-2/3 justify-end">
          <Link href={"/"}>
            <div className="cursor-pointer border border-black px-2 transition-all duration-300 hover:border-red-500 hover:text-red-500">
              <p>X</p>
            </div>
          </Link>
        </div>
        <div className="flex h-full w-full items-center justify-center">
          <Authenticator />
        </div>
      </section>
    </main>
  );
};
