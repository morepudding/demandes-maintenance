import connectToDB from "../lib/db";
import sql from "mssql";

export interface TypeDemande {
    id: number;
    name: string;
}

export const createType = async (typeName: string): Promise<void> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("name", sql.NVarChar, typeName);

        const query = `
            INSERT INTO Type_Demande (Type_Dem_Libelle)
            VALUES (@name)
        `;
        await request.query(query);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error("[createType] Erreur:", errorMessage);
        throw new Error(`Impossible de créer le type: ${errorMessage}`);
    }
};

export const getTypeById = async (
    typeId: number,
): Promise<TypeDemande | null> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, typeId);

        const query = `
            SELECT 
                Type_Dem_Id as id,
                Type_Dem_Libelle as name
            FROM Type_Demande
            WHERE Type_Dem_Id = @id
        `;

        const result = await request.query(query);

        const type = result.recordset[0];
        return type
            ? {
                  id: type.id,
                  name: type.name,
              }
            : null;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error("[getTypeById] Erreur:", errorMessage);
        throw new Error(`Impossible de récupérer le type: ${errorMessage}`);
    }
};

export const getTypesStats = async (): Promise<TypeDemande> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);

        const query = `
            SELECT 
                Type_Dem_Id as id,
                Type_Dem_Libelle as name
            FROM Type_Demande
        `;

        const result = await request.query(query);

        const stats = result.recordset[0];
        return {
            id: stats.id || 0,
            name: stats.name || "",
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error("[getTypesStats] Erreur:", errorMessage);
        throw new Error(
            `Impossible de récupérer les statistiques: ${errorMessage}`,
        );
    }
};

export const updateType = async (
    typeId: number,
    typeName: string,
): Promise<void> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, typeId);
        request.input("name", sql.NVarChar, typeName);

        const query = `
            UPDATE Type_Demande
            SET Type_Dem_Libelle = @name
            WHERE Type_Dem_Id = @id
        `;
        await request.query(query);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error("[updateType] Erreur:", errorMessage);
        throw new Error(`Impossible de mettre à jour le type: ${errorMessage}`);
    }
};

/**
 * Vérifie les dépendances d'un type (nombre de demandes l'utilisant)
 */
export const checkTypeDependencies = async (
    typeId: number,
): Promise<{ hasDependencies: boolean; demandesCount: number }> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("typeId", sql.Int, typeId);

        const query = `
            SELECT COUNT(*) as demandesCount
            FROM Demande
            WHERE Dem_Type_Demande = @typeId
        `;

        const result = await request.query(query);
        const record = result.recordset[0];
        const demandesCount = record?.demandesCount || 0;

        return {
            hasDependencies: demandesCount > 0,
            demandesCount,
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error("[checkTypeDependencies] Erreur:", errorMessage);
        throw new Error(
            `Impossible de vérifier les dépendances: ${errorMessage}`,
        );
    }
};

export const deleteType = async (typeId: number): Promise<void> => {
    try {
        // Vérifier les dépendances avant suppression
        const dependencies = await checkTypeDependencies(typeId);

        if (dependencies.hasDependencies) {
            throw new Error(
                `Impossible de supprimer ce type. ${dependencies.demandesCount} demande(s) l'utilisent actuellement.`,
            );
        }

        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, typeId);

        const query = `
            DELETE FROM Type_Demande
            WHERE Type_Dem_Id = @id
        `;
        await request.query(query);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error("[deleteType] Erreur:", errorMessage);
        throw new Error(`Impossible de supprimer le type: ${errorMessage}`);
    }
};
