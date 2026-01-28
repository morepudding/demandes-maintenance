"use client";
import React, { useEffect, useState } from "react";
import {
    FileType,
    ArrowLeft,
    Plus,
    Edit,
    Trash2,
    AlertCircle,
} from "lucide-react";
import Link from "next/link";
import { Toaster, toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/molecules/Dialog";
import {
    deleteSiteAction,
    checkSiteForDeletionAction,
} from "@/app/actions/demandes";

interface Site {
    id: string;
    name: string;
}

export default function SiteManagementPage() {
    const [sites, setSites] = useState<Site[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingSite, setEditingSite] = useState<Site | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deletingSiteId, setDeletingSiteId] = useState<string | null>(null);
    const [siteDependencies, setSiteDependencies] = useState<
        Record<string, number>
    >({});

    const [formData, setFormData] = useState({
        name: "",
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadSiteDependencies = async (sitesList: Site[]) => {
        try {
            const dependencies: Record<string, number> = {};

            for (const site of sitesList) {
                const result = await checkSiteForDeletionAction(
                    parseInt(site.id),
                );
                dependencies[site.id] = result.demandesCount;
            }

            setSiteDependencies(dependencies);
        } catch (error) {
            console.error(
                "Erreur lors du chargement des dépendances des sites:",
                error,
            );
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // TODO: Replace with actual API call to fetch sites
            // Mock data for now
            const mockSites: Site[] = [
                { id: "1", name: "Site A" },
                { id: "2", name: "Site B" },
                { id: "3", name: "Site C" },
            ];
            setSites(mockSites);
            setStats({
                totalSites: mockSites.length,
            });

            await loadSiteDependencies(mockSites);
        } catch (error) {
            console.error("Erreur lors du chargement des sites:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddSite = async () => {
        if (!formData.name.trim()) {
            toast.error("Le nom du site est requis.");
            return;
        }

        try {
            // TODO add API call
            const newSite: Site = {
                id: Date.now().toString(),
                name: formData.name,
            };
            setSites([...sites, newSite]);
            setFormData({ name: "" });
            setIsAddDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du site:", error);
        }
    };

    const handleEditSite = async () => {
        if (!formData.name.trim() || !editingSite) {
            toast.error("Le nom du site est requis.");
            return;
        }

        try {
            //TODO add API call
            setSites(
                sites.map((s) =>
                    s.id === editingSite.id
                        ? {
                              ...s,
                              name: formData.name,
                          }
                        : s,
                ),
            );
            setFormData({ name: "" });
            setEditingSite(null);
            setIsEditDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de la modification du site:", error);
        }
    };

    const handleDeleteClick = async (site: Site) => {
        try {
            const checkResult = await checkSiteForDeletionAction(
                parseInt(site.id),
            );

            if (!checkResult.canDelete) {
                toast.warning(checkResult.message, {
                    description: `Veuillez d'abord supprimer ou réaffecter les ${checkResult.demandesCount} demande(s) associée(s).`,
                });
                return;
            }

            toast.error(`Supprimer ${site.name} ?`, {
                description: "Cette action est irréversible.",
                action: {
                    label: "Supprimer",
                    onClick: () => handleConfirmDelete(site),
                },
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue";
            toast.error("Erreur lors de la vérification", {
                description: errorMessage,
            });
            console.error("Erreur lors de la vérification du site:", error);
        }
    };

    const handleConfirmDelete = async (site: Site) => {
        setDeletingSiteId(site.id);
        try {
            await deleteSiteAction(parseInt(site.id));
            setSites(sites.filter((s) => s.id !== site.id));
            toast.success("Site supprimé.", {
                description: `${site.name} a été supprimé avec succès.`,
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue";
            toast.error("Erreur lors de la suppression du site", {
                description: errorMessage,
            });
            console.error("Erreur lors de la suppression du site:", error);
        } finally {
            setDeletingSiteId(null);
        }
    };

    const openEditDialog = (site: Site) => {
        setEditingSite(site);
        setFormData({
            name: site.name,
        });
        setIsEditDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({ name: "" });
        setEditingSite(null);
    };

    if (isLoading) {
        return (
            <div className="container py-10 flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="container py-10 space-y-8">
            <Toaster position="bottom-right" richColors />
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="space-y-1">
                    <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer mb-2">
                        <ArrowLeft className="w-4 h-4" />
                        <Link href="/dashboard/admin">Retour au dashboard</Link>
                    </div>
                    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                        Gestion des sites
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Créez et gérez les sites.
                    </p>
                </div>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                            <Plus className="w-5 h-5" />
                            Ajouter un Site
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Créer un nouveau site</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations du nouveau site.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-2">
                                    Nom du site *
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            name: e.target.value,
                                        })
                                    }
                                    placeholder="Ex: Site des Cyclades"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                            <div className="flex justify-end gap-3 pt-4">
                                <button
                                    onClick={() => {
                                        resetForm();
                                        setIsAddDialogOpen(false);
                                    }}
                                    className="px-4 py-2 border border-input rounded-md hover:bg-slate-50 transition-colors font-medium"
                                >
                                    Annuler
                                </button>
                                <button
                                    onClick={handleAddSite}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Créer
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Card */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-semibold">
                        Liste des Sites ({sites.length})
                    </h2>
                </div>

                {sites.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileType className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg">
                            Aucun site trouvé.
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Commencez par en créer un en cliquant sur le bouton
                            &quot;Ajouter un Site&quot;.
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                        Nom
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                        Dépendances
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {sites.map((site) => {
                                    const dependencyCount =
                                        siteDependencies[site.id] || 0;
                                    const canDelete = dependencyCount === 0;

                                    return (
                                        <tr
                                            key={site.id}
                                            className={`border-b border-border transition-colors ${canDelete ? "hover:bg-slate-50" : "bg-orange-50/30"}`}
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                                {site.name}
                                            </td>

                                            <td className="px-6 py-4">
                                                {dependencyCount > 0 ? (
                                                    <div className="flex items-center gap-2">
                                                        <AlertCircle className="w-4 h-4 text-orange-600" />
                                                        <span className="text-sm font-medium text-orange-600">
                                                            {dependencyCount}{" "}
                                                            demande
                                                            {dependencyCount > 1
                                                                ? "s"
                                                                : ""}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-green-600 font-medium">
                                                        Aucune
                                                    </span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <div className="flex justify-end gap-2">
                                                    <Dialog
                                                        open={
                                                            isEditDialogOpen &&
                                                            editingSite?.id ===
                                                                site.id
                                                        }
                                                        onOpenChange={(
                                                            open,
                                                        ) => {
                                                            if (
                                                                !open &&
                                                                editingSite?.id ===
                                                                    site.id
                                                            ) {
                                                                setIsEditDialogOpen(
                                                                    false,
                                                                );
                                                                resetForm();
                                                            }
                                                        }}
                                                    >
                                                        <DialogTrigger asChild>
                                                            <button
                                                                onClick={() =>
                                                                    openEditDialog(
                                                                        site,
                                                                    )
                                                                }
                                                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                                                                title="Modifier"
                                                            >
                                                                <Edit className="w-4 h-4" />
                                                            </button>
                                                        </DialogTrigger>
                                                        <DialogContent>
                                                            <DialogHeader>
                                                                <DialogTitle>
                                                                    Modifier le
                                                                    site
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Mettez à
                                                                    jour les
                                                                    informations
                                                                    du site.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                                                        Nom du
                                                                        site *
                                                                    </label>
                                                                    <input
                                                                        type="text"
                                                                        value={
                                                                            formData.name
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setFormData(
                                                                                {
                                                                                    ...formData,
                                                                                    name: e
                                                                                        .target
                                                                                        .value,
                                                                                },
                                                                            )
                                                                        }
                                                                        placeholder="Ex: Site des Cyclades"
                                                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                                    />
                                                                </div>
                                                                <div className="flex justify-end gap-3 pt-4">
                                                                    <button
                                                                        onClick={() => {
                                                                            resetForm();
                                                                            setIsEditDialogOpen(
                                                                                false,
                                                                            );
                                                                        }}
                                                                        className="px-4 py-2 border border-input rounded-md hover:bg-slate-50 transition-colors font-medium"
                                                                    >
                                                                        Annuler
                                                                    </button>
                                                                    <button
                                                                        onClick={() => {
                                                                            handleEditSite();
                                                                        }}
                                                                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                                                                    >
                                                                        Enregistrer
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <button
                                                        onClick={() => {
                                                            handleDeleteClick(
                                                                site,
                                                            );
                                                        }}
                                                        disabled={
                                                            !canDelete ||
                                                            deletingSiteId ===
                                                                site.id
                                                        }
                                                        className={`p-2 rounded-md transition-colors ${
                                                            canDelete
                                                                ? "text-red-600 hover:bg-red-50 cursor-pointer"
                                                                : "text-gray-300 cursor-not-allowed"
                                                        }`}
                                                        title={
                                                            canDelete
                                                                ? "Supprimer"
                                                                : `Impossible de supprimer (${dependencyCount} demande${dependencyCount > 1 ? "s" : ""} associée${dependencyCount > 1 ? "s" : ""})`
                                                        }
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
