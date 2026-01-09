// Fichier pour capture ESLint dans VS Code
// Ouvre ce fichier et observe les erreurs soulignées en rouge

const unusedVar = "Cette variable n'est jamais utilisée";
const anotherUnused = [1, 2, 3];

// La fonction ci-dessous utilise les bonnes pratiques et consomme les variables
export function goodFunction() {
    return `${unusedVar} (${anotherUnused.length} éléments)`;
}
