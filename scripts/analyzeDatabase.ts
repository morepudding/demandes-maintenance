import connectToDB from "@/core/lib/db";
import * as fs from "fs";
import * as path from "path";

interface TableColumn {
    TABLE_NAME: string;
    COLUMN_NAME: string;
    DATA_TYPE: string;
    CHARACTER_MAXIMUM_LENGTH: number | null;
    IS_NULLABLE: string;
    COLUMN_DEFAULT: string | null;
}

interface ForeignKey {
    FK_NAME: string;
    TABLE_NAME: string;
    COLUMN_NAME: string;
    REFERENCED_TABLE_NAME: string;
    REFERENCED_COLUMN_NAME: string;
}

async function analyzeDatabase() {
    try {
        console.log("🔌 Connexion à la base de données...");
        console.log("Server:", process.env.DATABASE_HOST);
        console.log("Database:", process.env.DATABASE_NAME);
        console.log("Auth Type:", process.env.AZURE_SQL_AUTHENTICATIONTYPE);
        console.log("User:", process.env.DATABASE_USER);
        
        const pool = await connectToDB();
        console.log("✅ Connexion réussie !");

        // 1. Liste des tables
        console.log("\n📊 Récupération de la liste des tables...");
        const tablesResult = await pool.request().query(`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_TYPE = 'BASE TABLE' 
            AND TABLE_CATALOG = 'WF_Demandes_Maintenance'
            ORDER BY TABLE_NAME
        `);
        
        const tables = tablesResult.recordset.map((row: any) => row.TABLE_NAME);
        console.log(`✅ ${tables.length} tables trouvées:`, tables);

        // 2. Colonnes de toutes les tables
        console.log("\n📋 Récupération des colonnes...");
        const columnsResult = await pool.request().query(`
            SELECT 
                TABLE_NAME,
                COLUMN_NAME,
                DATA_TYPE,
                CHARACTER_MAXIMUM_LENGTH,
                IS_NULLABLE,
                COLUMN_DEFAULT
            FROM INFORMATION_SCHEMA.COLUMNS
            WHERE TABLE_CATALOG = 'WF_Demandes_Maintenance'
            ORDER BY TABLE_NAME, ORDINAL_POSITION
        `);

        const columns: TableColumn[] = columnsResult.recordset;

        // 3. Relations (Foreign Keys)
        console.log("\n🔗 Récupération des relations...");
        const fkResult = await pool.request().query(`
            SELECT 
                f.name AS FK_NAME,
                OBJECT_NAME(f.parent_object_id) AS TABLE_NAME,
                COL_NAME(fc.parent_object_id, fc.parent_column_id) AS COLUMN_NAME,
                OBJECT_NAME(f.referenced_object_id) AS REFERENCED_TABLE_NAME,
                COL_NAME(fc.referenced_object_id, fc.referenced_column_id) AS REFERENCED_COLUMN_NAME
            FROM sys.foreign_keys AS f
            INNER JOIN sys.foreign_key_columns AS fc 
                ON f.object_id = fc.constraint_object_id
            ORDER BY TABLE_NAME, COLUMN_NAME
        `);

        const foreignKeys: ForeignKey[] = fkResult.recordset;

        // 4. Générer le fichier DATABASE.md
        console.log("\n📝 Génération du fichier DATABASE.md...");
        let markdown = `# 📊 Base de Données - WF_Demandes_Maintenance

**Serveur** : \`gbensqlsvrpowerappsprd.database.windows.net\`  
**Base** : \`WF_Demandes_Maintenance\`  
**Date d'analyse** : ${new Date().toLocaleDateString('fr-FR')}

---

## 📋 Vue d'ensemble

Cette base contient **${tables.length} tables** :

${tables.map(t => `- \`${t}\``).join('\n')}

---

## 🗂️ Schéma Détaillé

`;

        for (const table of tables) {
            const tableCols = columns.filter(c => c.TABLE_NAME === table);
            const tableFKs = foreignKeys.filter(fk => fk.TABLE_NAME === table);

            markdown += `### Table : \`${table}\`\n\n`;
            markdown += `**Nombre de colonnes** : ${tableCols.length}\n\n`;

            // Colonnes
            markdown += `| Colonne | Type | Nullable | Défaut |\n`;
            markdown += `|---------|------|----------|--------|\n`;

            for (const col of tableCols) {
                const type = col.CHARACTER_MAXIMUM_LENGTH 
                    ? `${col.DATA_TYPE}(${col.CHARACTER_MAXIMUM_LENGTH})`
                    : col.DATA_TYPE;
                const nullable = col.IS_NULLABLE === 'YES' ? '✅' : '❌';
                const defaultVal = col.COLUMN_DEFAULT || '-';
                markdown += `| \`${col.COLUMN_NAME}\` | ${type} | ${nullable} | ${defaultVal} |\n`;
            }

            // Relations
            if (tableFKs.length > 0) {
                markdown += `\n**Relations** :\n\n`;
                for (const fk of tableFKs) {
                    markdown += `- \`${fk.COLUMN_NAME}\` → \`${fk.REFERENCED_TABLE_NAME}.${fk.REFERENCED_COLUMN_NAME}\`\n`;
                }
            }

            markdown += `\n---\n\n`;
        }

        // Sauvegarder le fichier
        const outputPath = path.join(process.cwd(), 'docs', 'planning', 'DATABASE.md');
        fs.writeFileSync(outputPath, markdown, 'utf-8');
        console.log(`✅ Fichier créé : ${outputPath}`);

        // Sauvegarder aussi un fichier JSON pour faciliter la génération des types
        const schemaJson = {
            tables,
            columns: columns.reduce((acc, col) => {
                if (!acc[col.TABLE_NAME]) acc[col.TABLE_NAME] = [];
                acc[col.TABLE_NAME].push(col);
                return acc;
            }, {} as Record<string, TableColumn[]>),
            foreignKeys
        };

        const jsonPath = path.join(process.cwd(), 'docs', 'planning', 'DATABASE_SCHEMA.json');
        fs.writeFileSync(jsonPath, JSON.stringify(schemaJson, null, 2), 'utf-8');
        console.log(`✅ Fichier JSON créé : ${jsonPath}`);

        console.log("\n✅ Analyse terminée avec succès !");
        process.exit(0);

    } catch (err) {
        console.error("❌ Erreur lors de l'analyse:", err);
        process.exit(1);
    }
}

analyzeDatabase();
