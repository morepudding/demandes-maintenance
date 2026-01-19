/**
 * Utilitaires de formatage de dates
 * Pour l'affichage des demandes de maintenance
 */

export function formatDate(date: Date | string): string {
    const d = typeof date === "string" ? new Date(date) : date;
    return d.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
    });
}

export function formatDateFR(date: Date): string {
    return date.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric",
    });
}

export function formatDateTime(date: Date): string {
    return date.toLocaleString("fr-FR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

export function isToday(date: Date): boolean {
    const today = new Date();
    return date.toDateString() === today.toDateString();
}
