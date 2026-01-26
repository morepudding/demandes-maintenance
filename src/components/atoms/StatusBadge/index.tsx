import { Badge } from "../Badge";
import type { DemandeStatus } from "@/core/services/validation.service";

interface StatusBadgeProps {
    status: DemandeStatus;
    className?: string;
}

/**
 * StatusBadge - Badge spécialisé pour afficher le statut d'une demande
 *
 * Affiche automatiquement la bonne couleur selon le statut
 *
 * @example
 * ```tsx
 * <StatusBadge status="En attente" />
 * <StatusBadge status="Validé" />
 * <StatusBadge status="Refusé" />
 * ```
 */
export function StatusBadge({ status, className }: StatusBadgeProps) {
    const getVariant = (status: DemandeStatus) => {
        switch (status) {
            case "A valider":
            case "En attente":
                return "warning";
            case "Validé":
                return "success";
            case "Refusé":
                return "error";
            case "Abandonné":
                return "outline";
            default:
                return "default";
        }
    };

    const getIcon = (status: DemandeStatus) => {
        switch (status) {
            case "A valider":
            case "En attente":
                return "⏳";
            case "Validé":
                return "✅";
            case "Refusé":
                return "❌";
            case "Abandonné":
                return "⊘";
            default:
                return "";
        }
    };

    return (
        <Badge variant={getVariant(status)} className={className}>
            <span className="mr-1">{getIcon(status)}</span>
            {status}
        </Badge>
    );
}
