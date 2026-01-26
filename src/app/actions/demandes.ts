"use server";

import {
    getDemandeurStats,
    getRecentDemandes,
} from "@/core/services/demandes.service";
import {
    getGestionnaireDashboard,
    GestionnaireFilters,
} from "@/core/services/validation.service";
import {
    deleteType,
    checkTypeDependencies,
} from "@/core/services/types.service";
import { getServerSession } from "next-auth";
import { authOptions } from "@/page/api/auth/[...nextauth]";

export const getDemandeurDashboardDataAction = async () => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            throw new Error("Utilisateur non authentifié");
        }

        // Utiliser displayName (ex: "Romain BOTTERO") car la DB stocke les noms complets
        const userName =
            session.user.displayName || session.user.name || session.user.email;

        if (!userName) {
            throw new Error("Impossible d'identifier l'utilisateur");
        }

        console.log("[getDemandeurDashboardDataAction] User:", {
            displayName: session.user.displayName,
            name: session.user.name,
            email: session.user.email,
            using: userName,
        });

        const [stats, recentDemandes] = await Promise.all([
            getDemandeurStats(userName),
            getRecentDemandes(userName),
        ]);

        return { stats, recentDemandes };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error(
            "[getDemandeurDashboardDataAction] Erreur:",
            errorMessage,
        );
        throw error;
    }
};

export const getGestionnaireDashboardDataAction = async (
    filters: GestionnaireFilters = {},
) => {
    try {
        const data = await getGestionnaireDashboard(filters);
        return data;
    } catch (error) {
        console.error("Erreur récupération dashboard gestionnaire", error);
        throw error;
    }
};

/**
 * Supprime un type en vérifiant d'abord les dépendances
 */
export const deleteTypeAction = async (typeId: number) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            throw new Error("Utilisateur non authentifié");
        }

        // Vérifier les dépendances avant suppression
        const dependencies = await checkTypeDependencies(typeId);

        if (dependencies.hasDependencies) {
            throw new Error(
                `Impossible de supprimer ce type. ${dependencies.demandesCount} demande(s) l'utilisent actuellement.`,
            );
        }

        // Supprimer le type
        await deleteType(typeId);

        return {
            success: true,
            message: "Type supprimé avec succès",
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[deleteTypeAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Vérifie les dépendances d'un type avant suppression
 */
export const checkTypeForDeletionAction = async (typeId: number) => {
    try {
        const dependencies = await checkTypeDependencies(typeId);

        return {
            canDelete: !dependencies.hasDependencies,
            demandesCount: dependencies.demandesCount,
            message: dependencies.hasDependencies
                ? `Ce type est utilisé par ${dependencies.demandesCount} demande(s) et ne peut pas être supprimé.`
                : undefined,
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[checkTypeForDeletionAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};
