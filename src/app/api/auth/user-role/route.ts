import { getServerSession } from "next-auth";
import { authOptions } from "../[...nextauth]/route";
import connectToDB from "@/core/lib/db";
import sql from "mssql";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ role: null }, { status: 401 });
        }

        const db = await connectToDB();
        const request = new sql.Request(db);

        // Chercher dans la table Gestionnaire
        request.input("email", sql.NVarChar, session.user.email);
        const gestionnaireResult = await request.query(
            "SELECT Ges_Id FROM Gestionnaire WHERE Ges_Email = @email",
        );

        if (gestionnaireResult.recordset.length > 0) {
            return NextResponse.json({ role: "gestionnaire" });
        }

        // Si pas gestionnaire, il est demandeur par défaut
        return NextResponse.json({ role: "demandeur" });
    } catch (error) {
        const errorMessage =
            error instanceof Error ? error.message : "Erreur inconnue";
        console.error("[GET /api/auth/user-role] Erreur:", errorMessage);
        return NextResponse.json(
            { error: "Impossible de récupérer le rôle" },
            { status: 500 },
        );
    }
}
