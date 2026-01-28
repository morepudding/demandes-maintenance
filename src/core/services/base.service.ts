import connectToDB from "../lib/db";
import sql from "mssql";

/**
 * Configuration pour chaque entité
 */
export interface BaseEntityConfig {
    tableName: string;
    idColumn: string;
    nameColumn: string;
    dependencyTable?: string;
    dependencyColumn?: string;
    errorContext: string;
}

/**
 * Interface générique pour une entité
 */
export interface BaseEntity {
    id: number;
    name: string;
}

/**
 * Récupère une entité par son ID
 */
export const getEntityById = async (
    id: number,
    config: BaseEntityConfig,
): Promise<BaseEntity | null> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, id);

        const query = `
            SELECT 
                ${config.idColumn} as id,
                ${config.nameColumn} as name
            FROM ${config.tableName}
            WHERE ${config.idColumn} = @id
        `;

        const result = await request.query(query);
        const entity = result.recordset[0];
        return entity
            ? {
                  id: entity.id,
                  name: entity.name,
              }
            : null;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error(
            `[getEntityById-${config.errorContext}] Erreur:`,
            errorMessage,
        );
        throw new Error(
            `Impossible de récupérer ${config.errorContext}: ${errorMessage}`,
        );
    }
};

/**
 * Récupère toutes les entités
 */
export const getAllEntities = async (
    config: BaseEntityConfig,
): Promise<BaseEntity[]> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);

        const query = `
            SELECT 
                ${config.idColumn} as id,
                ${config.nameColumn} as name
            FROM ${config.tableName}
            ORDER BY ${config.nameColumn}
        `;

        const result = await request.query(query);

        return result.recordset.map((entity: Record<string, unknown>) => ({
            id: entity.id as number,
            name: entity.name as string,
        }));
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error(
            `[getAllEntities-${config.errorContext}] Erreur:`,
            errorMessage,
        );
        throw new Error(
            `Impossible de récupérer ${config.errorContext}: ${errorMessage}`,
        );
    }
};

/**
 * Crée une nouvelle entité
 */
export const createEntity = async (
    name: string,
    config: BaseEntityConfig,
): Promise<void> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("name", sql.NVarChar, name);

        const query = `
            INSERT INTO ${config.tableName} (${config.nameColumn})
            VALUES (@name)
        `;
        await request.query(query);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error(
            `[createEntity-${config.errorContext}] Erreur:`,
            errorMessage,
        );
        throw new Error(
            `Impossible de créer ${config.errorContext}: ${errorMessage}`,
        );
    }
};

/**
 * Met à jour une entité
 */
export const updateEntity = async (
    id: number,
    name: string,
    config: BaseEntityConfig,
): Promise<void> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, id);
        request.input("name", sql.NVarChar, name);

        const query = `
            UPDATE ${config.tableName}
            SET ${config.nameColumn} = @name
            WHERE ${config.idColumn} = @id
        `;
        await request.query(query);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error(
            `[updateEntity-${config.errorContext}] Erreur:`,
            errorMessage,
        );
        throw new Error(
            `Impossible de mettre à jour ${config.errorContext}: ${errorMessage}`,
        );
    }
};

/**
 * Supprime une entité
 */
export const deleteEntity = async (
    id: number,
    config: BaseEntityConfig,
): Promise<void> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, id);

        const query = `
            DELETE FROM ${config.tableName}
            WHERE ${config.idColumn} = @id
        `;
        await request.query(query);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error(
            `[deleteEntity-${config.errorContext}] Erreur:`,
            errorMessage,
        );
        throw new Error(
            `Impossible de supprimer ${config.errorContext}: ${errorMessage}`,
        );
    }
};

/**
 * Vérifie les dépendances d'une entité
 */
export const checkEntityDependencies = async (
    id: number,
    config: BaseEntityConfig,
): Promise<{ hasDependencies: boolean; demandesCount: number }> => {
    try {
        if (!config.dependencyTable || !config.dependencyColumn) {
            return { hasDependencies: false, demandesCount: 0 };
        }

        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("id", sql.Int, id);

        const query = `
            SELECT COUNT(*) as demandesCount
            FROM ${config.dependencyTable}
            WHERE ${config.dependencyColumn} = @id
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
        console.error(
            `[checkEntityDependencies-${config.errorContext}] Erreur:`,
            errorMessage,
        );
        throw new Error(
            `Impossible de vérifier les dépendances: ${errorMessage}`,
        );
    }
};

/**
 * Récupère le nombre total d'entités
 */
export const getEntityCount = async (
    config: BaseEntityConfig,
): Promise<number> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);

        const query = `
            SELECT COUNT(*) as total
            FROM ${config.tableName}
        `;

        const result = await request.query(query);
        return result.recordset[0]?.total || 0;
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue.";
        console.error(
            `[getEntityCount-${config.errorContext}] Erreur:`,
            errorMessage,
        );
        throw new Error(
            `Impossible de récupérer le nombre de ${config.errorContext}: ${errorMessage}`,
        );
    }
};
