"use client";

import React, { useEffect, useState } from "react";
import {
    ClipboardList,
    Users,
    Building2,
    FileType,
    TrendingUp,
    Clock,
    CheckCircle,
    XCircle,
    ArrowLeft,
} from "lucide-react";
import { StatCard } from "@/components/molecules/StatCard";
import { getAdminDashboardDataAction } from "@/app/actions/demandes";
import Link from "next/link";

interface AdminStats {
    totalDemandes: number;
    demandesThisWeek: number;
    validatedThisWeek: number;
    rejectedThisWeek: number;
    averageProcessingTime: number;
    totalUsers: number;
    totalSites: number;
    totalTypes: number;
}

export default function DashboardAdmin() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsLoading(true);
                const result = await getAdminDashboardDataAction();
                setStats(result.stats);
            } catch (error) {
                console.error("Erreur dashboard admin:", error);
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

    const data = stats || {
        totalDemandes: 0,
        demandesThisWeek: 0,
        validatedThisWeek: 0,
        rejectedThisWeek: 0,
        averageProcessingTime: 0,
        totalUsers: 0,
        totalSites: 0,
        totalTypes: 0,
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
                        Dashboard Admin
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Vue globale du système de gestion des demandes.
                    </p>
                </div>
            </div>

            {/* Stats Cards - Row 1: Demandes */}
            <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
                    Activité Demandes
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Total Demandes"
                        value={data.totalDemandes}
                        icon={ClipboardList}
                        colorClassName="text-blue-600"
                        iconClassName="bg-blue-50"
                    />
                    <StatCard
                        title="Demandes (7j)"
                        value={data.demandesThisWeek}
                        icon={TrendingUp}
                        colorClassName="text-indigo-600"
                        iconClassName="bg-indigo-50"
                    />
                    <StatCard
                        title="Validées (7j)"
                        value={data.validatedThisWeek}
                        icon={CheckCircle}
                        colorClassName="text-emerald-600"
                        iconClassName="bg-emerald-50"
                    />
                    <StatCard
                        title="Refusées (7j)"
                        value={data.rejectedThisWeek}
                        icon={XCircle}
                        colorClassName="text-rose-600"
                        iconClassName="bg-rose-50"
                    />
                </div>
            </div>

            {/* Stats Cards - Row 2: Performance & Ressources */}
            <div>
                <h2 className="text-sm font-semibold text-muted-foreground mb-4 uppercase">
                    Performance & Ressources
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        title="Délai Moyen"
                        value={`${data.averageProcessingTime}j`}
                        icon={Clock}
                        colorClassName="text-amber-600"
                        iconClassName="bg-amber-50"
                    />
                    <StatCard
                        title="Gestionnaires"
                        value={data.totalUsers}
                        icon={Users}
                        colorClassName="text-purple-600"
                        iconClassName="bg-purple-50"
                    />
                    <StatCard
                        title="Sites/Services"
                        value={data.totalSites}
                        icon={Building2}
                        colorClassName="text-teal-600"
                        iconClassName="bg-teal-50"
                    />
                    <StatCard
                        title="Types Demande"
                        value={data.totalTypes}
                        icon={FileType}
                        colorClassName="text-orange-600"
                        iconClassName="bg-orange-50"
                    />
                </div>
            </div>

            {/* Admin Actions */}
            <div className="bg-white rounded-xl border border-border shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-6">Actions Admin</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <Link
                        href="/admin/sites"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                    >
                        <Building2 className="w-5 h-5 text-teal-600" />
                        <div>
                            <p className="font-medium">Gérer Sites</p>
                            <p className="text-sm text-muted-foreground">
                                Ajouter, modifier, supprimer des sites
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/dashboard/admin/types"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                    >
                        <FileType className="w-5 h-5 text-orange-600" />
                        <div>
                            <p className="font-medium">Gérer Types</p>
                            <p className="text-sm text-muted-foreground">
                                Ajouter, modifier, supprimer des types
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/budgets"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                    >
                        <ClipboardList className="w-5 h-5 text-blue-600" />
                        <div>
                            <p className="font-medium">Gérer Budgets</p>
                            <p className="text-sm text-muted-foreground">
                                Ajouter, modifier, supprimer des budgets
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/admin/users"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                    >
                        <Users className="w-5 h-5 text-purple-600" />
                        <div>
                            <p className="font-medium">Gérer Utilisateurs</p>
                            <p className="text-sm text-muted-foreground">
                                Gérer les rôles et permissions
                            </p>
                        </div>
                    </Link>

                    <Link
                        href="/all-requests"
                        className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-slate-50 transition-colors"
                    >
                        <ClipboardList className="w-5 h-5 text-indigo-600" />
                        <div>
                            <p className="font-medium">Toutes Demandes</p>
                            <p className="text-sm text-muted-foreground">
                                Consulter l&apos;ensemble des demandes
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
