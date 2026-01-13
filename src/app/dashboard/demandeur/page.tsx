"use client";

import React, { useEffect, useState } from "react";
import { FileText, Clock, CheckCircle, XCircle, ArrowLeft } from "lucide-react";
import { StatCard } from "@/components/molecules/StatCard";
import { getDemandeurDashboardDataAction } from "@/app/actions/demandes";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";

export default function DashboardDemandeur() {
    const [data, setData] = useState<{
        stats: {
            total: number;
            pending: number;
            approved: number;
            rejected: number;
        };
        recentDemandes: Record<string, unknown>[];
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getDemandeurDashboardDataAction();
                setData(result);
            } catch (error) {
                console.error("Erreur dashboard:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, []);

    if (isLoading) {
        return (
            <div className="container py-10 flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const { stats, recentDemandes } = data || {
        stats: { total: 0, pending: 0, approved: 0, rejected: 0 },
        recentDemandes: [],
    };

    return (
        <div className="container py-10 space-y-8">
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-2">
                        <ArrowLeft className="w-4 h-4" />
                        <Link href="/">Retour à l&apos;accueil</Link>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Mon Tableau de Bord
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Suivez l&apos;état de vos demandes de maintenance.
                    </p>
                </div>
                <Link
                    href="/demandes/nouvelle"
                    className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 px-4 py-2"
                >
                    Nouvelle demande
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Demandes"
                    value={stats.total}
                    icon={FileText}
                    colorClassName="text-blue-600"
                    iconClassName="bg-blue-50"
                />
                <StatCard
                    title="En Attente"
                    value={stats.pending}
                    icon={Clock}
                    colorClassName="text-amber-600"
                    iconClassName="bg-amber-50"
                />
                <StatCard
                    title="Validées"
                    value={stats.approved}
                    icon={CheckCircle}
                    colorClassName="text-emerald-600"
                    iconClassName="bg-emerald-50"
                />
                <StatCard
                    title="Refusées"
                    value={stats.rejected}
                    icon={XCircle}
                    colorClassName="text-rose-600"
                    iconClassName="bg-rose-50"
                />
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h2 className="text-lg font-semibold">Demandes Récentes</h2>
                    <Link
                        href="/my-requests"
                        className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-8 px-3"
                    >
                        Voir tout
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-slate-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-4 font-medium">
                                    Référence
                                </th>
                                <th className="px-6 py-4 font-medium">Titre</th>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">
                                    Statut
                                </th>
                                <th className="px-6 py-4 font-medium text-right">
                                    Action
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {recentDemandes.length > 0 ? (
                                recentDemandes.map(
                                    (demande: Record<string, unknown>) => (
                                        <tr
                                            key={demande.Dem_Id}
                                            className="hover:bg-slate-50 transition-colors"
                                        >
                                            <td className="px-6 py-4 font-mono font-medium text-primary">
                                                #{demande.Dem_Id}
                                            </td>
                                            <td className="px-6 py-4 font-medium truncate max-w-[200px]">
                                                {demande.Dem_Titre ||
                                                    "Sans titre"}
                                            </td>
                                            <td className="px-6 py-4 text-muted-foreground">
                                                {demande.Dem_Date_Creation
                                                    ? formatDate(
                                                          demande.Dem_Date_Creation,
                                                      )
                                                    : "-"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                    {demande.Dem_Etat_Demande ||
                                                        "En attente"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right text-indigo-600 hover:text-indigo-800 font-medium">
                                                <Link
                                                    href={`/demandes/${demande.Dem_Id}`}
                                                >
                                                    Détails
                                                </Link>
                                            </td>
                                        </tr>
                                    ),
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="px-6 py-10 text-center text-muted-foreground"
                                    >
                                        Aucune demande récente trouvée.
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
