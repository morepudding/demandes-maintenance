/**
 * Types générés automatiquement depuis la base de données WF_Demandes_Maintenance
 *
 * Serveur: gbensqlsvrpowerappsprd.database.windows.net
 * Base: WF_Demandes_Maintenance
 * Date de génération: 05/01/2026 16:43:34
 *
 * ⚠️ NE PAS MODIFIER CE FICHIER MANUELLEMENT
 * Regénérer avec: pnpm tsx scripts/generateTypes.ts
 */

/**
 * Table: [dbo].[Demandeur]
 */
export interface Demandeur {
    /** Primary Key, Read-only */
    Dema_Id?: number | null;
    /** Max length: 50 */
    Dema_Prenom?: string | null;
    /** Max length: 50 */
    Dema_Nom?: string | null;
    /** Max length: 50 */
    Dema_Mail?: string | null;
    /** Max length: 50 */
    Dema_Fullname?: string | null;
    Dema_Actif?: boolean | null;
}

/**
 * Table: [dbo].[Type_Demande]
 */
export interface Type_Demande {
    /** Primary Key, Read-only */
    Typ_Id?: number | null;
    /** Max length: 50 */
    Typ_nom?: string | null;
}

/**
 * Table: [dbo].[Sites_Services]
 */
export interface Sites_Services {
    /** Primary Key, Read-only */
    Sit_Id?: number | null;
    /** Max length: 50 */
    Sit_Nom?: string | null;
}

/**
 * Table: [dbo].[Gestionnaire]
 */
export interface Gestionnaire {
    /** Primary Key, Read-only */
    Ges_Id?: number | null;
    /** Max length: 50 */
    Ges_Prenom?: string | null;
    /** Max length: 50 */
    Ges_Nom?: string | null;
    /** Max length: 50 */
    Ges_mail?: string | null;
    /** Max length: 50 */
    Ges_Fullname?: string | null;
}

/**
 * Table: [dbo].[Valideur_Unite]
 */
export interface Valideur_Unite {
    /** Primary Key, Read-only */
    Val_Id?: number | null;
    /** Max length: 50 */
    Val_Prenom?: string | null;
    /** Max length: 50 */
    Val_Nom?: string | null;
    /** Max length: 50 */
    Val_Mail?: string | null;
    /** Max length: 50 */
    Val_Fullname?: string | null;
    Val_Actif?: boolean | null;
}

/**
 * Table: [dbo].[Demande]
 */
export interface Demande {
    /** Primary Key, Read-only */
    Dem_Id?: number | null;
    /** Max length: 255 */
    Dem_Titre?: string | null;
    Dem_Sites_Services?: number | null;
    Dem_Type_Demande?: number | null;
    Dem_Budget?: number | null;
    /** Max length: 255 */
    Dem_Numero_Compte_Imputation?: string | null;
    /** Max length: 255 */
    Dem_Descriptif?: string | null;
    Dem_Delai_Souhaite?: string | null;
    Dem_Code_Projet?: number | null;
    /** Max length: 255 */
    Dem_Etudes_Rentabilite?: string | null;
    /** Max length: 50 */
    Dem_Fournisseur_Souhaite?: string | null;
    Dem_Prix_Indicatif?: number | null;
    Dem_Validation_Unite?: boolean | null;
    Dem_Validation_Decideur?: boolean | null;
    Dem_Gestionnaire?: number | null;
    Dem_Decideur?: number | null;
    Dem_Delai?: string | null;
    /** Max length: 50 */
    Dem_Numero_Mntse?: string | null;
    Dem_Valideur1?: number | null;
    Dem_Valideur2?: number | null;
    Dem_Valideur3?: number | null;
    Dem_Valideur4?: number | null;
    Dem_Validation_Valideur1?: boolean | null;
    Dem_Validation_Valideur2?: boolean | null;
    Dem_Validation_Valideur3?: boolean | null;
    Dem_Validation_Valideur4?: boolean | null;
    Dem_Validation_Gestionnaire?: boolean | null;
    Dem_Prix?: number | null;
    /** Max length: 50 */
    Dem_Fournisseur?: string | null;
    /** Max length: 50 */
    Dem_Assigne_A?: string | null;
    Dem_Cree_Par?: number | null;
    /** Max length: 255 */
    Dem_Commentaire_Abandon?: string | null;
    /** Max length: 255 */
    Dem_Commentaire_Unite?: string | null;
    /** Max length: 255 */
    Dem_Commentaire_Demandeur?: string | null;
    /** Max length: 255 */
    Dem_Commentaire_Delai?: string | null;
    /** Max length: 50 */
    Dem_Etat_Demande?: string | null;
    Dem_pieces_jointes?: string | null;
    Dem_Validation_Demandeur?: boolean | null;
    /** Max length: 255 */
    Dem_Remarques?: string | null;
    Dem_Date_Creation?: string | null;
    Dem_Date_Validation_Unite?: string | null;
    Dem_Date_Validation_Demandeur?: string | null;
    Dem_Date_Validation_Gestionnaire?: string | null;
    Dem_Date_Validation_Decideur?: string | null;
    /** Max length: 255 */
    Dem_Cree_Par_Labele?: string | null;
}

/**
 * Table: [dbo].[Decideur]
 */
export interface Decideur {
    /** Primary Key, Read-only */
    Dec_Id?: number | null;
    /** Max length: 50 */
    Dec_Prenom?: string | null;
    /** Max length: 50 */
    Dec_Nom?: string | null;
    /** Max length: 50 */
    Dec_Mail?: string | null;
    /** Max length: 50 */
    Dec_Fullname?: string | null;
}

/**
 * Table: [dbo].[Budget]
 */
export interface Budget {
    /** Primary Key, Read-only */
    Bud_Id?: number | null;
    /** Max length: 50 */
    Bud_Nom?: string | null;
}

/**
 * Table: [dbo].[Administrateur]
 */
export interface Administrateur {
    /** Primary Key, Read-only */
    Adm_Id?: number | null;
    /** Max length: 50 */
    Adm_Nom?: string | null;
    /** Max length: 50 */
    Adm_Prenom?: string | null;
    /** Max length: 100 */
    Adm_Fullname?: string | null;
}

// ============================================
// Types utilitaires
// ============================================

/**
 * Type pour la création d'une nouvelle demande (sans les champs auto-générés)
 */
export type DemandeCreate = Omit<Demande, "Dem_Id" | "Dem_Cree_Par_Labele">;

/**
 * Type pour la mise à jour d'une demande (tous les champs optionnels sauf l'ID)
 */
export type DemandeUpdate = Partial<Omit<Demande, "Dem_Id">> & {
    Dem_Id: number;
};

/**
 * Types des utilisateurs
 */
export type User =
    | Demandeur
    | Gestionnaire
    | Decideur
    | Valideur_Unite
    | Administrateur;

/**
 * Rôles utilisateur
 */
export type UserRole =
    | "Demandeur"
    | "Gestionnaire"
    | "Decideur"
    | "ValideurUnite"
    | "Administrateur";

/**
 * États de validation possibles
 */
export type ValidationStatus = "En attente" | "Validé" | "Refusé" | "Abandonné";
