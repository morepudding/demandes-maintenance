import connectToDB, { formatQueryResult } from "../lib/db";
import sql from "mssql";

export interface DashboardStats {
    total: number;
    pending: number;
    approved: number;
    rejected: number;
}

export const getDemandeurStats = async (
    userEmail: string,
): Promise<DashboardStats> => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("email", sql.NVarChar, userEmail);

        const query = `
            SELECT 
                COUNT(*) as total,
                SUM(CASE WHEN Dem_Etat_Demande LIKE '%En cours%' OR Dem_Etat_Demande LIKE '%attente%' OR Dem_Etat_Demande IS NULL THEN 1 ELSE 0 END) as pending,
                SUM(CASE WHEN Dem_Etat_Demande LIKE '%réception%' OR Dem_Etat_Demande LIKE '%Terminé%' THEN 1 ELSE 0 END) as approved,
                SUM(CASE WHEN Dem_Etat_Demande LIKE '%Refus%' OR Dem_Etat_Demande LIKE '%Abandon%' THEN 1 ELSE 0 END) as rejected
            FROM Demande
            WHERE Dem_Cree_Par_Labele = @email
        `;

        const result = await request.query(query);

        const stats = result.recordset[0];
        return {
            total: stats.total || 0,
            pending: stats.pending || 0,
            approved: stats.approved || 0,
            rejected: stats.rejected || 0,
        };
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[getDemandeurStats] Erreur:", errorMessage);
        throw new Error(
            `Impossible de récupérer les statistiques: ${errorMessage}`,
        );
    }
};

export const getRecentDemandes = async (
    userEmail: string,
    limit: number = 5,
) => {
    try {
        const db = await connectToDB();
        const request = new sql.Request(db);
        request.input("email", sql.NVarChar, userEmail);
        request.input("limit", sql.Int, limit);

        const query = `
            SELECT TOP (@limit) *
            FROM Demande
            WHERE Dem_Cree_Par_Labele = @email
            ORDER BY Dem_Date_Creation DESC
        `;

        const result = await request.query(query);

        return formatQueryResult(result);
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[getRecentDemandes] Erreur:", errorMessage);
        throw new Error(
            `Impossible de récupérer les demandes récentes: ${errorMessage}`,
        );
    }
};
