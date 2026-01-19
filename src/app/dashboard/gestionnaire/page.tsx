"use client";

import React, { useEffect, useState } from "react";
import {
    ClipboardList,
    CheckCircle,
    XCircle,
    Clock,
    ArrowLeft,
    Filter,
} from "lucide-react";
import { StatCard } from "@/components/molecules/StatCard";
import { getGestionnaireDashboardDataAction } from "@/app/actions/demandes";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { StatusBadge } from "@/components/atoms/StatusBadge";

interface Site {
    sitId: number;
    sitNom: string;
}

interface Type {
    typId: number;
    typNom: string;
}

interface Demande {
    demId: number;
    demObjet: string;
    demDateCreation: string;
    demStatut: string;
    demEtatDemande: string;
    sitNom: string;
    typNom: string;
    demCreePaLabele: string;
}

export default function DashboardGestionnaire() {
    const [data, setData] = useState<{
        stats: {
            awaitingValidation: number;
            validatedThisWeek: number;
            rejectedThisWeek: number;
            averageProcessingTime: number;
        };
        demandesAValider: Demande[];
        sites: Site[];
        types: Type[];
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [siteFilter, setSiteFilter] = useState<number | undefined>();
    const [typeFilter, setTypeFilter] = useState<number | undefined>();

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await getGestionnaireDashboardDataAction(
                siteFilter,
                typeFilter,
            );
            setData(result);
        } catch (error) {
            console.error("Erreur dashboard gestionnaire:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [siteFilter, typeFilter]);

    const handleSiteFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = e.target.value;
        setSiteFilter(value ? Number.parseInt(value, 10) : undefined);
    };

    const handleTypeFilterChange = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        const value = e.target.value;
        setTypeFilter(value ? Number.parseInt(value, 10) : undefined);
    };

    const resetFilters = () => {
        setSiteFilter(undefined);
        setTypeFilter(undefined);
    };

    if (isLoading) {
        return (
            <div className="container py-10 flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const { stats, demandesAValider, sites, types } = data || {
        stats: {
            awaitingValidation: 0,
            validatedThisWeek: 0,
            rejectedThisWeek: 0,
            averageProcessingTime: 0,
        },
        demandesAValider: [],
        sites: [],
        types: [],
    };

    return (
        <div className="container py-10 space-y-8">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-2">
                        <ArrowLeft className="w-4 h-4" />
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Dashboard Gestionnaire
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Validez et gérez les demandes de maintenance.
                    </p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="À Valider"
                    value={stats.awaitingValidation}
                    icon={ClipboardList}
                    colorClassName="text-amber-600"
                    iconClassName="bg-amber-50"
                />
                <StatCard
                    title="Validées (7j)"
                    value={stats.validatedThisWeek}
                    icon={CheckCircle}
                    colorClassName="text-emerald-600"
                    iconClassName="bg-emerald-50"
                />
                <StatCard
                    title="Refusées (7j)"
                    value={stats.rejectedThisWeek}
                    icon={XCircle}
                    colorClassName="text-rose-600"
                    iconClassName="bg-rose-50"
                />
                <StatCard
                    title="Délai Moyen"
                    value={`${stats.averageProcessingTime}j`}
                    icon={Clock}
                    colorClassName="text-blue-600"
                    iconClassName="bg-blue-50"
                />
            </div>

            {/* Filtres et Liste */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                {/* Header avec filtres */}
                <div className="p-6 border-b border-border space-y-4">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold">
                            Demandes à Valider
                        </h2>
                        <div className="text-sm text-muted-foreground">
                            {demandesAValider.length} demande
                            {demandesAValider.length > 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* Filtres rapides */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <label
                                htmlFor="siteFilter"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Site :
                            </label>
                            <select
                                id="siteFilter"
                                value={siteFilter || ""}
                                onChange={handleSiteFilterChange}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="">Tous les sites</option>
                                {sites.map((site) => (
                                    <option key={site.sitId} value={site.sitId}>
                                        {site.sitNom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="typeFilter"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Type :
                            </label>
                            <select
                                id="typeFilter"
                                value={typeFilter || ""}
                                onChange={handleTypeFilterChange}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="">Tous les types</option>
                                {types.map((type) => (
                                    <option key={type.typId} value={type.typId}>
                                        {type.typNom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {(siteFilter || typeFilter) && (
                            <button
                                onClick={resetFilters}
                                className="text-sm text-primary hover:underline"
                            >
                                Réinitialiser
                            </button>
                        )}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">
                                    Référence
                                </th>
                                <th className="px-6 py-4 font-medium">Titre</th>
                                <th className="px-6 py-4 font-medium">Site</th>
                                <th className="px-6 py-4 font-medium">Type</th>
                                <th className="px-6 py-4 font-medium">
                                    Demandeur
                                </th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">
                                    Statut
                                </th>
                                <th className="px-6 py-4 font-medium text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {demandesAValider.length > 0 ? (
                                demandesAValider.map((demande) => (
                                    <tr
                                        key={demande.demId}
                                        className="hover:bg-slate-50 transition-colors"
                                    >
                                        <td className="px-6 py-4 font-mono font-medium text-primary">
                                            #{demande.demId}
                                        </td>
                                        <td className="px-6 py-4 font-medium truncate max-w-[200px]">
                                            {demande.demObjet}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {demande.sitNom || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {demande.typNom || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {demande.demCreePaLabele || "-"}
                                        </td>
                                        <td className="px-6 py-4 text-muted-foreground">
                                            {demande.demDateCreation
                                                ? formatDate(
                                                      demande.demDateCreation,
                                                  )
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
                                            <Link
                                                href={`/demandes/${demande.demId}`}
                                                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 px-3"
                                            >
                                                Détails
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={8}
                                        className="px-6 py-12 text-center text-muted-foreground"
                                    >
                                        {siteFilter || typeFilter ? (
                                            <>
                                                Aucune demande à valider avec
                                                ces filtres.
                                            </>
                                        ) : (
                                            <>
                                                Aucune demande en attente de
                                                validation.
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
