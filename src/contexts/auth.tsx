"use client";

import { SessionProvider, SessionProviderProps } from "next-auth/react";

export const AuthProvider = ({
    session,
    children,
}: {
    session: SessionProviderProps["session"];
    children: React.ReactNode;
}) => {
    return <SessionProvider session={session}>{children}</SessionProvider>;
};
