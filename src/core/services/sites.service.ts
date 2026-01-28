import { Sites_Services } from "@/core/types/database.types";
import connectToDB from "../lib/db";
import sql from "mssql";

/**
 * Récupère tous les sites
 */
export const getAllSites = async (): Promise<Sites_Services[]> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);

        const result = await request.query(
            "SELECT Sit_Id, Sit_Nom FROM [dbo].[Sites_Services] ORDER BY Sit_Nom",
        );

        return result.recordset.map((row: Record<string, unknown>) => ({
            Sit_Id: row.Sit_Id,
            Sit_Nom: row.Sit_Nom,
        }));
    } catch (error) {
        console.error("[getAllSites] Erreur:", error);
        throw new Error("Impossible de récupérer les sites");
    }
};

/**
 * Récupère un site par son ID
 */
export const getSiteById = async (
    id: number,
): Promise<Sites_Services | null> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, id);

        const result = await request.query(
            "SELECT Sit_Id, Sit_Nom FROM [dbo].[Sites_Services] WHERE Sit_Id = @id",
        );

        if (result.recordset.length === 0) {
            return null;
        }

        const row = result.recordset[0];
        return {
            Sit_Id: row.Sit_Id,
            Sit_Nom: row.Sit_Nom,
        };
    } catch (error) {
        console.error("[getSiteById] Erreur:", error);
        throw new Error("Impossible de récupérer le site");
    }
};

/**
 * Crée un nouveau site
 */
export const createSite = async (name: string): Promise<Sites_Services> => {
    try {
        // Validation
        if (!name || name.trim().length === 0) {
            throw new Error("Le nom du site est requis");
        }

        if (name.length > 50) {
            throw new Error(
                "Le nom du site ne doit pas dépasser 50 caractères",
            );
        }

        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("name", sql.NVarChar(50), name.trim());

        const result = await request.query(
            "INSERT INTO [dbo].[Sites_Services] (Sit_Nom) VALUES (@name); SELECT CAST(SCOPE_IDENTITY() as int) as id",
        );

        const newId = result.recordset[0].id;

        return {
            Sit_Id: newId,
            Sit_Nom: name.trim(),
        };
    } catch (error) {
        console.error("[createSite] Erreur:", error);
        throw error instanceof Error
            ? error
            : new Error("Impossible de créer le site");
    }
};

/**
 * Met à jour un site
 */
export const updateSite = async (
    id: number,
    name: string,
): Promise<Sites_Services> => {
    try {
        // Validation
        if (!name || name.trim().length === 0) {
            throw new Error("Le nom du site est requis");
        }

        if (name.length > 50) {
            throw new Error(
                "Le nom du site ne doit pas dépasser 50 caractères",
            );
        }

        const db = await connectToDB();
        const request = new sql.Request(db);

        // Vérifier que le site existe
        request.input("id", sql.Int, id);
        const existingResult = await request.query(
            "SELECT Sit_Id FROM [dbo].[Sites_Services] WHERE Sit_Id = @id",
        );

        if (existingResult.recordset.length === 0) {
            throw new Error("Site non trouvé");
        }

        // Mettre à jour
        const updateRequest = new sql.Request(db);
        updateRequest.input("id", sql.Int, id);
        updateRequest.input("name", sql.NVarChar(50), name.trim());

        await updateRequest.query(
            "UPDATE [dbo].[Sites_Services] SET Sit_Nom = @name WHERE Sit_Id = @id",
        );

        return {
            Sit_Id: id,
            Sit_Nom: name.trim(),
        };
    } catch (error) {
        console.error("[updateSite] Erreur:", error);
        throw error instanceof Error
            ? error
            : new Error("Impossible de mettre à jour le site");
    }
};

/**
 * Supprime un site
 */
export const deleteSite = async (id: number): Promise<void> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);

        // Vérifier que le site existe
        request.input("id", sql.Int, id);
        const existingResult = await request.query(
            "SELECT Sit_Id FROM [dbo].[Sites_Services] WHERE Sit_Id = @id",
        );

        if (existingResult.recordset.length === 0) {
            throw new Error("Site non trouvé");
        }

        // Supprimer
        const deleteRequest = new sql.Request(db);
        deleteRequest.input("id", sql.Int, id);
        await deleteRequest.query(
            "DELETE FROM [dbo].[Sites_Services] WHERE Sit_Id = @id",
        );
    } catch (error) {
        console.error("[deleteSite] Erreur:", error);
        throw error instanceof Error
            ? error
            : new Error("Impossible de supprimer le site");
    }
};

/**
 * Vérifie les dépendances d'un site (demandes liées)
 */
export const checkSiteDependencies = async (
    id: number,
): Promise<{ canDelete: boolean; demandesCount: number; message: string }> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);

        // Compter le nombre de demandes associées à ce site
        request.input("siteId", sql.Int, id);
        const result = await request.query(
            "SELECT COUNT(*) as demandesCount FROM [dbo].[Demande] WHERE Dem_Sites_Services = @siteId",
        );

        const demandesCount = result.recordset[0].demandesCount;
        const canDelete = demandesCount === 0;

        return {
            canDelete,
            demandesCount,
            message: canDelete
                ? "Ce site peut être supprimé"
                : `Ce site est utilisé par ${demandesCount} demande(s)`,
        };
    } catch (error) {
        console.error("[checkSiteDependencies] Erreur:", error);
        throw new Error("Impossible de vérifier les dépendances du site");
    }
};

/**
 * Récupère les statistiques des sites
 */
export const getSitesStats = async (): Promise<{
    totalSites: number;
    totalDemandes: number;
}> => {
    try {
        const db = await connectToDB();

        // Requête 1: Compter les sites
        const request1 = new sql.Request(db);
        const result1 = await request1.query(
            "SELECT COUNT(*) as totalSites FROM [dbo].[Sites_Services]",
        );

        // Requête 2: Compter les demandes
        const request2 = new sql.Request(db);
        const result2 = await request2.query(
            "SELECT COUNT(*) as totalDemandes FROM [dbo].[Demande]",
        );

        return {
            totalSites: result1.recordset[0].totalSites,
            totalDemandes: result2.recordset[0].totalDemandes,
        };
    } catch (error) {
        console.error("[getSitesStats] Erreur:", error);
        throw new Error("Impossible de récupérer les statistiques des sites");
    }
};
