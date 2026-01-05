"use client";

import { signIn, signOut } from "next-auth/react";
import { useEffect } from "react";

export default function SignInRedirect() {
    
    useEffect(() => {
        signIn("azure-ad")
    }, []);

    return null;
}
