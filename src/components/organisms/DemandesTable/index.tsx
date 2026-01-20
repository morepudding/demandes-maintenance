import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { StatusBadge } from "@/components/atoms/StatusBadge";

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
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
                <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b border-border">
                    <tr>
                        <th className="px-6 py-4 font-medium">Référence</th>
                        <th className="px-6 py-4 font-medium">Titre</th>
                        <th className="px-6 py-4 font-medium">Site</th>
                        <th className="px-6 py-4 font-medium">Type</th>
                        <th className="px-6 py-4 font-medium">Demandeur</th>
                        <th className="px-6 py-4 font-medium">Date</th>
                        <th className="px-6 py-4 font-medium">Statut</th>
                        <th className="px-6 py-4 font-medium text-right">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border">
                    {demandes.length > 0 ? (
                        demandes.map((demande) => (
                            <tr
                                key={demande.demId}
                                className="hover:bg-slate-50 transition-colors"
                            >
                                <td className="px-6 py-4 font-mono font-medium text-primary">
                                    #{demande.demId}
                                </td>
                                <td className="px-6 py-4 font-medium truncate max-w-[200px]">
                                    {demande.demTitre}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {demande.sitNom || "-"}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {demande.typNom || "-"}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {demande.demCreeParLabele || "-"}
                                </td>
                                <td className="px-6 py-4 text-muted-foreground">
                                    {demande.demDateCreation
                                        ? formatDate(demande.demDateCreation)
                                        : "-"}
                                </td>
                                <td className="px-6 py-4">
                                    <StatusBadge
                                        status={
                                            demande.demEtatDemande ||
                                            "En attente"
                                        }
                                    />
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Link
                                        href={`/demandes/${demande.demId}/valider`}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-8 px-3"
                                    >
                                        Valider
                                    </Link>
                                    <button
                                        onClick={() => onRefuseClick(demande)}
                                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 px-3"
                                    >
                                        Refuser
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td
                                colSpan={8}
                                className="px-6 py-12 text-center text-muted-foreground"
                            >
                                {hasFilters ? (
                                    <>
                                        Aucune demande à valider avec ces
                                        filtres.
                                    </>
                                ) : (
                                    <>Aucune demande en cours.</>
                                )}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
