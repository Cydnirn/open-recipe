"use client";

import { Authenticator, useAuthenticator } from "@aws-amplify/ui-react";
import AmplifyComp from "@/components/Amplify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

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
        <main className='bg-default h-screen w-full flex items-center justify-center'>
            <Authenticator />
        </main>
    );
};
