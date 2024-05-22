"use client";

import { Button } from "@aws-amplify/ui-react";
import { AuthUser, getCurrentUser } from "aws-amplify/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
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
    }, []);

    return (
        <nav className='flex justify-end px-5 py-5'>
            {user ? (
                <h1>Hello {user.username}</h1>
            ) : (
                <Button className="primary-button" variation='primary'>
                    Sign In
                </Button>
            )}
        </nav>
    );
}