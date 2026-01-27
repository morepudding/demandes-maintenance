"use client";

import React, { useEffect, useState, useRef } from "react";
import {
    ClipboardList,
    CheckCircle,
    Clock,
    ArrowLeft,
    Filter,
} from "lucide-react";
import { Toaster, toast } from "sonner";
import { StatCard } from "@/components/molecules/StatCard";
import DemandesTable, { Demande } from "@/components/organisms/DemandesTable";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/molecules/AlertDialog";
import {
    getGestionnaireDashboardDataAction,
    rejectDemandeAction,
} from "@/app/actions/demandes";
import Link from "next/link";

import type { DemandeStatus } from "@/core/services/validation.service";

type StatusOption = DemandeStatus;

export default function DashboardGestionnaire() {
    const [data, setData] = useState<{
        stats: {
            toValidate: number;
            validatedThisMonth: number;
            waiting: number;
        };
        demandes: Demande[];
    } | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState<StatusOption | undefined>(
        "A valider",
    );
    const [fromDate, setFromDate] = useState<string>("");
    const [toDate, setToDate] = useState<string>("");
    const [selectedDemandeForRefusal, setSelectedDemandeForRefusal] =
        useState<Demande | null>(null);
    const [isRefusing, setIsRefusing] = useState(false);
    const alertTriggerRef = useRef<HTMLButtonElement>(null);

    const fetchData = async () => {
        try {
            setIsLoading(true);
            const result = await getGestionnaireDashboardDataAction({
                status: statusFilter,
                fromDate: fromDate || undefined,
                toDate: toDate || undefined,
            });
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
    }, [statusFilter, fromDate, toDate]);

    const resetFilters = () => {
        setStatusFilter("A valider");
        setFromDate("");
        setToDate("");
    };

    const handleRefuseClick = (demande: Demande) => {
        setSelectedDemandeForRefusal(demande);
        // Trigger the alert dialog
        setTimeout(() => {
            alertTriggerRef.current?.click();
        }, 0);
    };

    const handleConfirmRefusal = async () => {
        if (!selectedDemandeForRefusal) return;

        setIsRefusing(true);
        try {
            await rejectDemandeAction(selectedDemandeForRefusal.demId);
            toast.success("Demande refusée", {
                description: `La demande #${selectedDemandeForRefusal.demId} a été refusée.`,
            });
            setSelectedDemandeForRefusal(null);
            await fetchData();
        } catch (error) {
            const message =
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue";
            toast.error("Refus impossible", { description: message });
        } finally {
            setIsRefusing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="container py-10 flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    const { stats, demandes } = data || {
        stats: {
            toValidate: 0,
            validatedThisMonth: 0,
            waiting: 0,
        },
        demandes: [],
    };

    return (
        <div className="container py-10 space-y-8">
            <Toaster position="bottom-right" richColors />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <StatCard
                    title="Demandes à valider"
                    value={stats.toValidate}
                    icon={ClipboardList}
                    colorClassName="text-amber-600"
                    iconClassName="bg-amber-50"
                />
                <StatCard
                    title="Validées ce mois"
                    value={stats.validatedThisMonth}
                    icon={CheckCircle}
                    colorClassName="text-emerald-600"
                    iconClassName="bg-emerald-50"
                />
                <StatCard
                    title="En attente"
                    value={stats.waiting}
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
                            {demandes.length} demande
                            {demandes.length > 1 ? "s" : ""}
                        </div>
                    </div>

                    {/* Filtres rapides */}
                    <div className="flex flex-wrap gap-4">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-muted-foreground" />
                            <label
                                htmlFor="statusFilter"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Statut :
                            </label>
                            <select
                                id="statusFilter"
                                value={statusFilter || ""}
                                onChange={(e) =>
                                    setStatusFilter(
                                        (e.target.value as StatusOption | "") ||
                                            undefined,
                                    )
                                }
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            >
                                <option value="">Tous les statuts</option>
                                <option value="A valider">À valider</option>
                                <option value="Validé">Validé</option>
                                <option value="En attente">En attente</option>
                                <option value="Refusé">Refusé</option>
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="fromDate"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Du :
                            </label>
                            <input
                                id="fromDate"
                                type="date"
                                value={fromDate}
                                onChange={(e) => setFromDate(e.target.value)}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <label
                                htmlFor="toDate"
                                className="text-sm font-medium text-muted-foreground"
                            >
                                Au :
                            </label>
                            <input
                                id="toDate"
                                type="date"
                                value={toDate}
                                onChange={(e) => setToDate(e.target.value)}
                                className="rounded-md border border-input bg-background px-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                            />
                        </div>

                        {(statusFilter || fromDate || toDate) && (
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
                <DemandesTable
                    demandes={demandes}
                    onRefuseClick={handleRefuseClick}
                    hasFilters={!!(statusFilter || fromDate || toDate)}
                />
            </div>

            {/* Refusal Confirmation Alert */}
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <button ref={alertTriggerRef} style={{ display: "none" }} />
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Confirmer le refus</AlertDialogTitle>
                        <AlertDialogDescription>
                            Êtes-vous sûr de vouloir refuser la demande{" "}
                            <strong>#{selectedDemandeForRefusal?.demId}</strong>{" "}
                            ? Cette action ne peut pas être annulée.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <div className="flex gap-3 justify-end">
                        <AlertDialogCancel>Annuler</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleConfirmRefusal}
                            disabled={isRefusing}
                        >
                            Refuser
                        </AlertDialogAction>
                    </div>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
