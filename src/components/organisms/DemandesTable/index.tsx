import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { StatusBadge } from "@/components/atoms/StatusBadge";
import DataTable, {
    DataTableColumnDefinition,
    DataTableRow,
} from "@/components/organisms/DataTable";
import { Button } from "@/components/atoms/Button";

import type { DemandeStatus } from "@/core/services/validation.service";

export interface Demande {
    demId: number;
    demTitre: string;
    demDateCreation: string;
    demEtatDemande: string;
    sitNom: string;
    typNom: string;
    demCreeParLabele: string;
}

interface DemandesTableProps {
    demandes: Demande[];
    onRefuseClick: (demande: Demande) => void;
    hasFilters?: boolean;
}

export default function DemandesTable({
    demandes,
    onRefuseClick,
    hasFilters = false,
}: DemandesTableProps) {
    // Column definitions with sorting and filtering
    const columnsDefinition: { [key: string]: DataTableColumnDefinition } = {
        reference: {
            key: "reference",
            order: 1,
            name: "Référence",
            sortable: true,
            filterable: true,
            filterType: "number",
        },
        titre: {
            key: "titre",
            order: 2,
            name: "Titre",
            sortable: true,
            filterable: true,
            filterType: "text",
        },
        site: {
            key: "site",
            order: 3,
            name: "Site",
            sortable: true,
            filterable: true,
            filterType: "text",
        },
        type: {
            key: "type",
            order: 4,
            name: "Type",
            sortable: true,
            filterable: true,
            filterType: "text",
        },
        demandeur: {
            key: "demandeur",
            order: 5,
            name: "Demandeur",
            sortable: true,
            filterable: true,
            filterType: "text",
        },
        date: {
            key: "date",
            order: 6,
            name: "Date",
            sortable: true,
            filterable: false,
        },
        statut: {
            key: "statut",
            order: 7,
            name: "Statut",
            sortable: true,
            filterable: true,
            filterType: "text",
        },
        actions: {
            key: "actions",
            order: 8,
            name: "Actions",
            sortable: false,
            filterable: false,
        },
    };

    // Convert demandes to DataTable rows
    const rows: DataTableRow[] = demandes.map((demande) => ({
        key: `demande-${demande.demId}`,
        cells: [
            {
                key: "reference",
                render: () => (
                    <span className="font-mono font-medium text-primary">
                        #{demande.demId}
                    </span>
                ),
                value: demande.demId,
            },
            {
                key: "titre",
                render: () => (
                    <span className="font-medium truncate max-w-[200px] block">
                        {demande.demTitre}
                    </span>
                ),
                value: demande.demTitre,
            },
            {
                key: "site",
                value: demande.sitNom || "-",
            },
            {
                key: "type",
                value: demande.typNom || "-",
            },
            {
                key: "demandeur",
                value: demande.demCreeParLabele || "-",
            },
            {
                key: "date",
                render: () => (
                    <span className="text-muted-foreground">
                        {demande.demDateCreation
                            ? formatDate(demande.demDateCreation)
                            : "-"}
                    </span>
                ),
                value: demande.demDateCreation,
            },
            {
                key: "statut",
                render: () => {
                    const status = (demande.demEtatDemande ||
                        "En attente") as DemandeStatus;
                    return <StatusBadge status={status} />;
                },
                value: demande.demEtatDemande,
            },
            {
                key: "actions",
                render: () => (
                    <div className="flex justify-end gap-2">
                        <Link
                            href={`/demandes/${demande.demId}/valider`}
                            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3"
                        >
                            Valider
                        </Link>
                        <Button
                            onClick={() => onRefuseClick(demande)}
                            variant="ghost"
                            size="sm"
                        >
                            Refuser
                        </Button>
                    </div>
                ),
                value: null,
            },
        ],
    }));

    if (demandes.length === 0) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                {hasFilters ? (
                    <>Aucune demande à valider avec ces filtres.</>
                ) : (
                    <>Aucune demande en cours.</>
                )}
            </div>
        );
    }

    return (
        <DataTable
            columnsDefinition={columnsDefinition}
            rows={rows}
            defaultPageSize={10}
        />
    );
}
