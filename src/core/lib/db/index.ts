import sql from "mssql";

/*ID officiel de l’application “Microsoft SQL Server Command-Line Tools”.
Microsoft l’utilise pour tous les drivers officiels pour les scénarios Azure AD password auth.
Il est documenté dans la doc officielle Microsoft.*/
const clientId = "04b07795-8ddb-461a-bbee-02f9e1bf7b46";

let pool: sql.ConnectionPool | null = null;
let connectionPromise: Promise<sql.ConnectionPool> | null = null;

export default async function connectToDB() {
    if (pool?.connected) {
        return pool;
    }

    // Éviter les doubles authentifications en réutilisant la promesse en cours
    if (connectionPromise) {
        return connectionPromise;
    }

    const server = process.env.DATABASE_HOST;
    const database = process.env.DATABASE_NAME;
    const port = Number.parseInt(process.env.DATABASE_PORT || "1433");
    const authenticationType = process.env.AZURE_SQL_AUTHENTICATIONTYPE;
    const user = process.env.DATABASE_USER;
    const password = process.env.DATABASE_PASSWORD;
    const tenantId = process.env.AZURE_AD_TENANT_ID;

    // Validation des variables d'environnement
    if (!server || !database) {
        const error = new Error(
            `Configuration de base de données invalide. SERVER=${server}, DATABASE=${database}`,
        );
        console.error("DB Connection error:", error.message);
        throw error;
    }

    const config: sql.config = {
        server,
        port,
        database,
        options: {
            encrypt: true,
            trustServerCertificate: true,
            enableArithAbort: true,
        },
        pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000,
        },
        connectionTimeout: 30000,
        requestTimeout: 30000,
    };

    // Créer la promesse de connexion AVANT le bloc try pour éviter les doubles appels
    connectionPromise = (async () => {
        try {
            if (authenticationType === "azure-active-directory-password") {
                if (!user || !password || !tenantId) {
                    throw new Error(
                        "Configuration Azure AD incomplète. Vérifiez DATABASE_USER, DATABASE_PASSWORD et AZURE_AD_TENANT_ID.",
                    );
                }
                config.authentication = {
                    type: "azure-active-directory-password",
                    options: {
                        userName: user,
                        password: password,
                        clientId: clientId,
                        tenantId: tenantId,
                    },
                };
                console.log(
                    `[DB] Connexion Azure AD en cours vers ${server}/${database}...`,
                );
            } else if (
                authenticationType === "azure-active-directory-interactive"
            ) {
                // Utilisation d'un token acquis interactivement (MFA browser popup)
                const { InteractiveBrowserCredential } =
                    await import("@azure/identity");
                const credential = new InteractiveBrowserCredential({
                    tenantId: tenantId,
                });
                const tokenResponse = await credential.getToken(
                    "https://database.windows.net//.default",
                );

                config.authentication = {
                    type: "azure-active-directory-access-token",
                    options: {
                        token: tokenResponse.token,
                    },
                };
                console.log(
                    `[DB] Connexion via Token Interactif (MFA) vers ${server}/${database}...`,
                );
            } else if (
                authenticationType === "azure-active-directory-default"
            ) {
                config.authentication = {
                    type: "azure-active-directory-default",
                    options: {
                        userName: user,
                        tenantId: tenantId,
                    },
                };
                console.log(
                    `[DB] Connexion Azure AD Default vers ${server}/${database}...`,
                );
            } else {
                if (!user || !password) {
                    throw new Error(
                        "Configuration SQL Auth incomplète. Vérifiez DATABASE_USER et DATABASE_PASSWORD.",
                    );
                }
                config.authentication = {
                    type: "default",
                    options: {
                        userName: user,
                        password: password,
                    },
                };
                console.log(
                    `[DB] Connexion SQL Auth en cours vers ${server}/${database}...`,
                );
            }

            const newPool = await new sql.ConnectionPool(config).connect();
            pool = newPool;
            console.log(`[DB] ✓ Connexion établie avec ${server}/${database}`);
            return pool;
        } catch (err) {
            // Extraire les détails de l'AggregateError si présent
            const error = err as {
                message?: string;
                code?: string;
                originalError?: {
                    errors?: Array<{ message: string }>;
                    message?: string;
                };
            };
            let errorDetails = error.message || "Erreur inconnue";
            if (
                error.originalError &&
                Array.isArray(error.originalError.errors)
            ) {
                errorDetails = error.originalError.errors
                    .map((e) => e.message)
                    .join("; ");
            } else if (error.originalError?.message) {
                errorDetails = error.originalError.message;
            }

            console.error("[DB] ✗ Erreur de connexion détaillée:", {
                message: error.message,
                code: error.code,
                originalError: error.originalError,
                errorDetails,
                server,
                database,
                authenticationType,
            });
            pool = null;
            connectionPromise = null;
            throw new Error(
                `Impossible de se connecter à la base de données: ${errorDetails}`,
            );
        }
    })();

    return connectionPromise;
}

export * from "./format";
export * from "./queries";
