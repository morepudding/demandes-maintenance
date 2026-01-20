"use server";

export interface GestionnaireStats {
    toValidate: number;
    validatedThisMonth: number;
    waiting: number;
}

export type GestionnaireStatus =
    | "A valider"
    | "Validé"
    | "En attente"
    | "Refusé";

export interface GestionnaireFilters {
    status?: GestionnaireStatus;
    fromDate?: string;
    toDate?: string;
}

export interface GestionnaireDemande {
    demId: number;
    demTitre: string;
    demDateCreation: string;
    demEtatDemande: string;
    demCreeParLabele: string;
    sitNom: string;
    typNom: string;
}

export interface GestionnaireDashboardData {
    stats: GestionnaireStats;
    demandes: GestionnaireDemande[];
}

/**
 * Récupère les données du dashboard gestionnaire avec filtres
 * TODO: Connecter à la base de données réelle
 */
export const getGestionnaireDashboard = async (
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: GestionnaireFilters = {},
): Promise<GestionnaireDashboardData> => {
    // TODO: Remplacer par de vraies requêtes DB
    // Utiliser filters pour filtrer par statut, fromDate, toDate
    // Pour l'instant, retourne des données vides
    const stats: GestionnaireStats = {
        toValidate: 0,
        validatedThisMonth: 0,
        waiting: 0,
    };

    return {
        stats,
        demandes: [],
    };
};

/**
 * Valide une demande
 * TODO: Connecter à la base de données réelle
 */
export const validateDemande = async (demandeId: number): Promise<void> => {
    // TODO: Implémenter la validation en DB
    console.log("Validation de la demande:", demandeId);
};

/**
 * Refuse une demande
 * TODO: Connecter à la base de données réelle
 */
export const rejectDemande = async (demandeId: number): Promise<void> => {
    // TODO: Implémenter le refus en DB
    console.log("Refus de la demande:", demandeId);
};
