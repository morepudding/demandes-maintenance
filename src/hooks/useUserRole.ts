"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";

export type UserRole = "demandeur" | "gestionnaire" | "admin" | null;

/**
 * Hook pour récupérer le rôle de l'utilisateur actuel
 */
export function useUserRole(): { role: UserRole; isLoading: boolean } {
    const { data: session, status } = useSession();
    const [role, setRole] = useState<UserRole>(null);

    useEffect(() => {
        const determineRole = async () => {
            if (!session?.user?.email) {
                setRole(null);
                return;
            }

            try {
                // Récupérer le rôle depuis l'API
                const response = await fetch("/api/auth/user-role");
                if (!response.ok) {
                    setRole(null);
                    return;
                }

                const data = await response.json();
                setRole(data.role || null);
            } catch (error) {
                console.error("Erreur lors de la récupération du rôle:", error);
                setRole(null);
            }
        };

        if (status !== "loading") {
            determineRole();
        }
    }, [session?.user?.email, status]);

    return {
        role,
        isLoading: status === "loading",
    };
}
