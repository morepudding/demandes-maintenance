"use client";

import { useSession } from "next-auth/react";

export interface CurrentUser {
    name: string | null;
    email: string | null;
    image: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

/**
 * Hook simple pour récupérer l'utilisateur connecté
 *
 * @returns CurrentUser avec les infos basiques (nom, email, image)
 *
 * @example
 * ```tsx
 * const { name, email, isAuthenticated, isLoading } = useCurrentUser();
 *
 * if (isLoading) return <div>Chargement...</div>;
 * if (!isAuthenticated) return <div>Non connecté</div>;
 *
 * return <div>Bonjour {name}</div>;
 * ```
 */
export function useCurrentUser(): CurrentUser {
    const { data: session, status } = useSession();

    return {
        name: session?.user?.name ?? null,
        email: session?.user?.email ?? null,
        image: session?.user?.image ?? null,
        isAuthenticated: !!session,
        isLoading: status === "loading",
    };
}
