"use server";

import {
    getDemandeurStats,
    getRecentDemandes,
} from "@/core/services/demandes.service";
import {
    getGestionnaireDashboard,
    GestionnaireFilters,
    rejectDemande,
} from "@/core/services/validation.service";
import {
    deleteType,
    checkTypeDependencies,
    getTypesStats,
} from "@/core/services/types.service";
import {
    deleteSite,
    checkSiteDependencies,
    getSitesStats,
} from "@/core/services/sites.service";
import {
    deleteBudget,
    checkBudgetDependencies,
    getAllBudgets,
    createBudget,
    updateBudget,
} from "@/core/services/budgets.service";
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

        const [stats, recentDemandesRaw] = await Promise.all([
            getDemandeurStats(userName),
            getRecentDemandes(userName),
        ]);

        const recentDemandes = Array.isArray(recentDemandesRaw)
            ? recentDemandesRaw
            : recentDemandesRaw
              ? [recentDemandesRaw]
              : [];

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

export const getAdminDashboardDataAction = async () => {
    try {
        const [sitesStats, typesStats] = await Promise.all([
            getSitesStats(),
            getTypesStats(),
        ]);

        return {
            stats: {
                totalDemandes: sitesStats.totalDemandes ?? 0,
                demandesThisWeek: 0,
                validatedThisWeek: 0,
                rejectedThisWeek: 0,
                averageProcessingTime: 0,
                totalUsers: 0,
                totalSites: sitesStats.totalSites ?? 0,
                totalTypes: typesStats.totalTypes ?? 0,
            },
        };
    } catch (error) {
        console.error("Erreur récupération dashboard admin", error);
        throw error;
    }
};

export const rejectDemandeAction = async (demandeId: number) => {
    try {
        await rejectDemande(demandeId);
        return { success: true };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[rejectDemandeAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
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

/**
 * Vérifie les dépendances d'un site avant suppression
 */
export const checkSiteForDeletionAction = async (siteId: number) => {
    try {
        const dependencies = await checkSiteDependencies(siteId);
        return {
            canDelete: dependencies.canDelete,
            demandesCount: dependencies.demandesCount,
            message: !dependencies.canDelete
                ? `Ce site est utilisé par ${dependencies.demandesCount} demande(s) et ne peut pas être supprimé.`
                : undefined,
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[checkSiteForDeletionAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Supprime un site en vérifiant d'abord les dépendances
 */
export const deleteSiteAction = async (siteId: number) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            throw new Error("Utilisateur non authentifié");
        }

        // Vérifier les dépendances avant suppression
        const dependencies = await checkSiteDependencies(siteId);

        if (!dependencies.canDelete) {
            throw new Error(
                `Impossible de supprimer ce site. ${dependencies.demandesCount} demande(s) l'utilisent actuellement.`,
            );
        }

        // Supprimer le site
        await deleteSite(siteId);

        return {
            success: true,
            message: "Site supprimé avec succès",
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[deleteSiteAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Vérifie les dépendances d'un budget avant suppression
 */
export const checkBudgetForDeletionAction = async (budgetId: number) => {
    try {
        const dependencies = await checkBudgetDependencies(budgetId);
        return {
            canDelete: !dependencies.hasDependencies,
            demandesCount: dependencies.demandesCount,
            message: !dependencies.hasDependencies
                ? `Ce budget est utilisé par ${dependencies.demandesCount} demande(s) et ne peut pas être supprimé.`
                : undefined,
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[checkBudgetForDeletionAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Supprime un budget en vérifiant d'abord les dépendances
 */
export const deleteBudgetAction = async (budgetId: number) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            throw new Error("Utilisateur non authentifié");
        }

        // Vérifier les dépendances avant suppression
        const dependencies = await checkBudgetForDeletionAction(budgetId);

        if (!dependencies.canDelete) {
            throw new Error(
                `Impossible de supprimer ce budget. ${dependencies.demandesCount} demande(s) l'utilisent actuellement.`,
            );
        }

        // Supprimer le budget
        await deleteBudget(budgetId);

        return {
            success: true,
            message: "Budget supprimé avec succès",
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[deleteBudgetAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Récupère tous les budgets
 */
export const getAllBudgetsAction = async () => {
    try {
        const budgets = await getAllBudgets();
        return budgets;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[getAllBudgetsAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Crée un nouveau budget
 */
export const createBudgetAction = async (budgetName: string) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            throw new Error("Utilisateur non authentifié");
        }

        await createBudget(budgetName);

        return {
            success: true,
            message: "Budget créé avec succès",
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[createBudgetAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};

/**
 * Met à jour un budget
 */
export const updateBudgetAction = async (
    budgetId: number,
    budgetName: string,
) => {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user) {
            throw new Error("Utilisateur non authentifié");
        }

        await updateBudget(budgetId, budgetName);

        return {
            success: true,
            message: "Budget mis à jour avec succès",
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[updateBudgetAction] Erreur:", errorMessage);
        throw new Error(errorMessage);
    }
};
