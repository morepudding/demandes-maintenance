import connectToDB, {
    formatQueryResult,
} from "../lib/db";
import sql from "mssql";
import { BddInfo } from "../types/dbTypes";

export const getBddConnectionStatus = async () => {
    const db = await connectToDB();
    const request = new sql.Request(db);

    const query = `
        SELECT DB_NAME() AS BDD_NAME, SUSER_NAME() AS BDD_USER;
    `;

    const result = formatQueryResult(await request.query(query)) as BddInfo[];
    db.close();

    return result
};