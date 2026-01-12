"use client";

import React from "react";
import { PlusCircle, List, CheckSquare, Settings, LayoutDashboard, FileText } from "lucide-react";
import { ActionCard } from "@/components/molecules/ActionCard";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export const HomePage: React.FC = () => {
    const { name, isLoading } = useCurrentUser();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    // Pour le moment, on affiche toutes les actions ou on mock le rôle
    // S0-3 et S1-2 mentionnent la gestion des rôles à venir
    const actions = [
        {
            title: "Nouvelle demande",
            description: "Créer une nouvelle demande de maintenance",
            icon: PlusCircle,
            href: "/demandes/nouvelle",
            colorClassName: "text-blue-600",
            iconClassName: "bg-blue-50",
            roles: ["demandeur", "admin"]
        },
        {
            title: "Mes demandes",
            description: "Suivre l'état de vos demandes en cours",
            icon: List,
            href: "/my-requests",
            colorClassName: "text-indigo-600",
            iconClassName: "bg-indigo-50",
            roles: ["demandeur", "admin"]
        },
        {
            title: "À valider",
            description: "Demandes en attente de votre validation",
            icon: CheckSquare,
            href: "/gestionnaire/validation",
            colorClassName: "text-amber-600",
            iconClassName: "bg-amber-50",
            roles: ["gestionnaire", "admin"]
        },
        {
            title: "Toutes les demandes",
            description: "Consulter l'ensemble des demandes du site",
            icon: LayoutDashboard,
            href: "/all-requests",
            colorClassName: "text-emerald-600",
            iconClassName: "bg-emerald-50",
            roles: ["gestionnaire", "admin"]
        },
        {
            title: "Administration",
            description: "Gérer les sites, types et budgets",
            icon: Settings,
            href: "/admin",
            colorClassName: "text-slate-600",
            iconClassName: "bg-slate-50",
            roles: ["admin"]
        },
        {
            title: "Guide Utilisateur",
            description: "Consulter la documentation d'aide",
            icon: FileText,
            href: "/docs/user-guide",
            colorClassName: "text-rose-600",
            iconClassName: "bg-rose-50",
            roles: ["all"]
        }
    ];

    return (
        <div className="container py-10 space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tight">
                    Bonjour, {name ?? "Utilisateur"}
                </h1>
                <p className="text-muted-foreground text-lg">
                    Bienvenue sur votre espace de gestion des demandes de maintenance.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {actions.map((action) => (
                    <ActionCard
                        key={action.href}
                        title={action.title}
                        description={action.description}
                        icon={action.icon}
                        href={action.href}
                        colorClassName={action.colorClassName}
                        iconClassName={action.iconClassName}
                    />
                ))}
            </div>
        </div>
    );
};
