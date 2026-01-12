import * as fs from "fs";
import * as path from "path";

// Lire le schéma JSON
const schemaPath = path.join(
    process.cwd(),
    "docs",
    "planning",
    "DATABASE_SCHEMA.json",
);
const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));

// Mapper les types SQL vers TypeScript
function mapSqlTypeToTs(sqlType: string, format?: string): string {
    if (format === "int64") return "number";

    switch (sqlType) {
        case "integer":
            return "number";
        case "string":
            return "string";
        case "boolean":
            return "boolean";
        case "number":
            return "number";
        case "object":
            return "Record<string, any>";
        case "array":
            return "any[]";
        default:
            return "any";
    }
}

let typescript = `/**
 * Types générés automatiquement depuis la base de données WF_Demandes_Maintenance
 * 
 * Serveur: ${schema.server}
 * Base: ${schema.database}
 * Date de génération: ${new Date().toLocaleString("fr-FR")}
 * 
 * ⚠️ NE PAS MODIFIER CE FICHIER MANUELLEMENT
 * Regénérer avec: pnpm tsx scripts/generateTypes.ts
 */

`;

// Générer un type pour chaque table
for (const table of schema.tables) {
    const typeName = table.name;
    const columns = table.columns;

    typescript += `/**\n * Table: ${table.sqlName}\n */\n`;
    typescript += `export interface ${typeName} {\n`;

    for (const [colName, colDef] of Object.entries(columns) as [
        string,
        any,
    ][]) {
        const isOptional =
            colDef["x-ms-permission"] === "read-only" || !colDef.required;
        const tsType = mapSqlTypeToTs(colDef.type, colDef.format);
        const nullableSuffix = isOptional ? " | null" : "";
        const optionalMarker = isOptional ? "?" : "";

        // Ajouter un commentaire avec les métadonnées
        const comments = [];
        if (colDef["x-ms-keyType"] === "primary") comments.push("Primary Key");
        if (colDef["x-ms-permission"] === "read-only")
            comments.push("Read-only");
        if (colDef.maxLength) comments.push(`Max length: ${colDef.maxLength}`);

        if (comments.length > 0) {
            typescript += `  /** ${comments.join(", ")} */\n`;
        }

        typescript += `  ${colName}${optionalMarker}: ${tsType}${nullableSuffix};\n`;
    }

    typescript += `}\n\n`;
}

// Ajouter des types utilitaires
typescript += `// ============================================\n`;
typescript += `// Types utilitaires\n`;
typescript += `// ============================================\n\n`;

typescript += `/**\n * Type pour la création d'une nouvelle demande (sans les champs auto-générés)\n */\n`;
typescript += `export type DemandeCreate = Omit<Demande, 'Dem_Id' | 'Dem_Cree_Par_Labele'>;\n\n`;

typescript += `/**\n * Type pour la mise à jour d'une demande (tous les champs optionnels sauf l'ID)\n */\n`;
typescript += `export type DemandeUpdate = Partial<Omit<Demande, 'Dem_Id'>> & { Dem_Id: number };\n\n`;

typescript += `/**\n * Types des utilisateurs\n */\n`;
typescript += `export type User = Demandeur | Gestionnaire | Decideur | ValideurUnite | Administrateur;\n\n`;

typescript += `/**\n * Rôles utilisateur\n */\n`;
typescript += `export type UserRole = 'Demandeur' | 'Gestionnaire' | 'Decideur' | 'ValideurUnite' | 'Administrateur';\n\n`;

typescript += `/**\n * États de validation possibles\n */\n`;
typescript += `export type ValidationStatus = 'En attente' | 'Validé' | 'Refusé' | 'Abandonné';\n\n`;

// Sauvegarder le fichier
const outputPath = path.join(
    process.cwd(),
    "src",
    "core",
    "types",
    "database.types.ts",
);
fs.writeFileSync(outputPath, typescript, "utf-8");
console.log(`✅ Types TypeScript générés : ${outputPath}`);
console.log(`📊 ${schema.tables.length} types créés`);
