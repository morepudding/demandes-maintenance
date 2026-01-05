import sql from "mssql";

const server = process.env.DATABASE_HOST || "";
const database = process.env.DATABASE_NAME;
const port = parseInt(process.env.DATABASE_PORT || "1433");
const authenticationType = process.env.AZURE_SQL_AUTHENTICATIONTYPE || "";
const user = process.env.DATABASE_USER || "";
const password = process.env.DATABASE_PASSWORD || "";
const tenantId = process.env.AZURE_AD_TENANT_ID || "";

/*ID officiel de l’application “Microsoft SQL Server Command-Line Tools”.
Microsoft l’utilise pour tous les drivers officiels pour les scénarios Azure AD password auth.
Il est documenté dans la doc officielle Microsoft.*/
const clientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

const baseConfig: sql.config = {
    server,
    port,
    database,
    options: {
        encrypt: true,
        trustServerCertificate: true,
    },
};

export default async function connectToDB() {
    const config: sql.config = { ...baseConfig };

    try {
        if (authenticationType === "azure-active-directory-password") {
            
            config.authentication = {
                type: "azure-active-directory-password",
                options: {
                    userName: user,
                    password: password,
                    clientId: clientId,
                    tenantId: tenantId,
                },
            };
        } else {
            // SQL Auth classique - USed for local database
            config.authentication = {
                type: "default",
                options: {
                    userName: user,
                    password: password,
                },
            };
        }

        const pool = await sql.connect(config);
        return pool;

    } catch (err) {
        console.error("DB Connection error:", err);
        throw err;
    }
}

export * from "./format";
export * from "./queries";