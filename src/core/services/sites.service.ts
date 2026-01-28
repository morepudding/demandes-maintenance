import { Sites_Services } from "@/core/types/database.types";
import {
    getEntityById,
    getAllEntities,
    createEntity,
    updateEntity,
    deleteEntity,
    checkEntityDependencies,
    getEntityCount,
    type BaseEntityConfig,
} from "./base.service";

const SITE_CONFIG: BaseEntityConfig = {
    tableName: "[dbo].[Sites_Services]",
    idColumn: "Sit_Id",
    nameColumn: "Sit_Nom",
    dependencyTable: "[dbo].[Demande]",
    dependencyColumn: "Dem_Sites_Services",
    errorContext: "site",
};

/**
 * Récupère tous les sites
 */
export const getAllSites = async (): Promise<Sites_Services[]> => {
    const entities = await getAllEntities(SITE_CONFIG);
    return entities.map((e) => ({
        Sit_Id: e.id,
        Sit_Nom: e.name,
    }));
};

/**
 * Récupère un site par son ID
 */
export const getSiteById = async (
    id: number,
): Promise<Sites_Services | null> => {
    const entity = await getEntityById(id, SITE_CONFIG);
    return entity
        ? {
              Sit_Id: entity.id,
              Sit_Nom: entity.name,
          }
        : null;
};

/**
 * Crée un nouveau site
 */
export const createSite = async (name: string): Promise<Sites_Services> => {
    if (!name || name.trim().length === 0) {
        throw new Error("Le nom du site est requis");
    }

    if (name.length > 50) {
        throw new Error("Le nom du site ne doit pas dépasser 50 caractères");
    }

    await createEntity(name.trim(), SITE_CONFIG);

    // Retourner un objet temporaire (l'ID réel viendrait de la BD en production)
    return {
        Sit_Id: 0, // À améliorer: récupérer l'ID auto-généré
        Sit_Nom: name.trim(),
    };
};

/**
 * Met à jour un site
 */
export const updateSite = async (
    id: number,
    name: string,
): Promise<Sites_Services> => {
    if (!name || name.trim().length === 0) {
        throw new Error("Le nom du site est requis");
    }

    if (name.length > 50) {
        throw new Error("Le nom du site ne doit pas dépasser 50 caractères");
    }

    await updateEntity(id, name.trim(), SITE_CONFIG);

    return {
        Sit_Id: id,
        Sit_Nom: name.trim(),
    };
};

/**
 * Supprime un site
 */
export const deleteSite = async (id: number): Promise<void> => {
    return deleteEntity(id, SITE_CONFIG);
};

/**
 * Vérifie les dépendances d'un site (demandes liées)
 */
export const checkSiteDependencies = async (
    id: number,
): Promise<{ canDelete: boolean; demandesCount: number; message: string }> => {
    const dependencies = await checkEntityDependencies(id, SITE_CONFIG);
    const demandesCount = dependencies.demandesCount;
    const canDelete = !dependencies.hasDependencies;

    return {
        canDelete,
        demandesCount,
        message: canDelete
            ? "Ce site peut être supprimé"
            : `Ce site est utilisé par ${demandesCount} demande(s)`,
    };
};

/**
 * Récupère les statistiques des sites
 */
export const getSitesStats = async (): Promise<{
    totalSites: number;
    totalDemandes: number;
}> => {
    const totalSites = await getEntityCount(SITE_CONFIG);
    // TODO: Ajouter une fonction pour compter les demandes totales
    return {
        totalSites,
        totalDemandes: 0,
    };
};
