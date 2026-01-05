import * as fs from "fs";
import * as path from "path";

// Lire le fichier DataSources.json de l'ancienne app PowerApps
const powerAppsPath = "C:\\RomainOpen\\DemandeMaintenance\\msapp_extracted\\References\\DataSources.json";
const dataSourcesContent = fs.readFileSync(powerAppsPath, 'utf-8');
const dataSources = JSON.parse(dataSourcesContent);

// Extraire uniquement les tables SQL
const sqlTables = dataSources.DataSources.filter((ds: any) => 
    ds.Type === "ConnectedDataSourceInfo" && 
    ds.ApiId === "/providers/microsoft.powerapps/apis/shared_sql"
);

console.log(`📊 ${sqlTables.length} tables SQL trouvées\n`);

let markdown = `# 📊 Base de Données - WF_Demandes_Maintenance

**Serveur** : \`gbensqlsvrpowerappsprd.database.windows.net\`  
**Base** : \`WF_Demandes_Maintenance\`  
**Date d'analyse** : ${new Date().toLocaleDateString('fr-FR')}  
**Source** : Métadonnées PowerApps

---

## 📋 Vue d'ensemble

Cette base contient **${sqlTables.length} tables** :

${sqlTables.map((t: any) => `- \`${t.Name}\``).join('\n')}

---

## 🗂️ Schéma Détaillé

`;

// Pour chaque table, extraire le schéma depuis les métadonnées
for (const table of sqlTables) {
    const tableName = table.Name;
    const tableNameMapping = table.ConnectedDataSourceInfoNameMapping;
    
    // Parser le JSON des métadonnées
    const tableKey = Object.keys(table.DataEntityMetadataJson)[0];
    const metadata = JSON.parse(table.DataEntityMetadataJson[tableKey]);
    
    const properties = metadata.schema.items.properties;
    const columns = Object.keys(properties);
    
    markdown += `### Table : \`${tableName}\`\n\n`;
    markdown += `**Table SQL** : \`${tableKey}\`  \n`;
    markdown += `**Nombre de colonnes** : ${columns.length}\n\n`;
    
    // En-tête du tableau
    markdown += `| Colonne | Type | Max Length | Nullable | Primary Key | Read-Only |\n`;
    markdown += `|---------|------|------------|----------|-------------|----------|\n`;
    
    for (const colName of columns) {
        const col = properties[colName];
        const type = col.type + (col.format ? `(${col.format})` : '');
        const maxLength = col.maxLength || '-';
        const nullable = col.required ? '❌' : '✅';
        const isPK = col['x-ms-keyType'] === 'primary' ? '🔑' : '-';
        const isReadOnly = col['x-ms-permission'] === 'read-only' ? '🔒' : '✏️';
        
        markdown += `| \`${colName}\` | ${type} | ${maxLength} | ${nullable} | ${isPK} | ${isReadOnly} |\n`;
    }
    
    markdown += `\n---\n\n`;
}

// Ajouter une section sur les relations qu'on peut déduire des noms de colonnes
markdown += `## 🔗 Relations Identifiées\n\n`;
markdown += `Basé sur les conventions de nommage :\n\n`;

// Analyser les tables pour trouver les champs qui ressemblent à des FK
for (const table of sqlTables) {
    const tableName = table.Name;
    const tableKey = Object.keys(table.DataEntityMetadataJson)[0];
    const metadata = JSON.parse(table.DataEntityMetadataJson[tableKey]);
    const properties = metadata.schema.items.properties;
    
    for (const colName of Object.keys(properties)) {
        // Détecter les potentielles FK (ex: Dem_Budget → Budget)
        if (colName.includes('_') && !colName.endsWith('_Id')) {
            const parts = colName.split('_');
            if (parts.length >= 2) {
                const potentialTable = parts[parts.length - 1];
                // Vérifier si une table avec ce nom existe
                const matchingTable = sqlTables.find((t: any) => 
                    t.Name.toLowerCase() === potentialTable.toLowerCase() ||
                    t.Name.toLowerCase().startsWith(potentialTable.toLowerCase())
                );
                
                if (matchingTable && tableName !== matchingTable.Name) {
                    markdown += `- \`${tableName}.${colName}\` → \`${matchingTable.Name}\` (probable)\n`;
                }
            }
        }
    }
}

markdown += `\n---\n\n`;

// Sauvegarder le fichier
const outputPath = path.join(process.cwd(), 'docs', 'planning', 'DATABASE.md');
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, markdown, 'utf-8');
console.log(`✅ Fichier créé : ${outputPath}`);

// Sauvegarder aussi les données brutes en JSON pour générer les types
const outputJson = {
    server: "gbensqlsvrpowerappsprd.database.windows.net",
    database: "WF_Demandes_Maintenance",
    tables: sqlTables.map((t: any) => {
        const tableKey = Object.keys(t.DataEntityMetadataJson)[0];
        const metadata = JSON.parse(t.DataEntityMetadataJson[tableKey]);
        return {
            name: t.Name,
            sqlName: tableKey,
            columns: metadata.schema.items.properties
        };
    })
};

const jsonPath = path.join(process.cwd(), 'docs', 'planning', 'DATABASE_SCHEMA.json');
fs.writeFileSync(jsonPath, JSON.stringify(outputJson, null, 2), 'utf-8');
console.log(`✅ Fichier JSON créé : ${jsonPath}`);

console.log("\n✅ Analyse terminée avec succès !");
