"use client";

import { signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignOutRedirect() {
    useEffect(() => {
        signOut({ callbackUrl: "/" });
    }, []);

    return null;
}
