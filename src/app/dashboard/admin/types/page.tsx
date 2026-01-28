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
    deleteTypeAction,
    checkTypeForDeletionAction,
} from "@/app/actions/demandes";

interface Type {
    id: string;
    name: string;
    description: string;
    createdAt: string;
}

export default function TypesManagementPage() {
    const [types, setTypes] = useState<Type[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [editingType, setEditingType] = useState<Type | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [deletingTypeId, setDeletingTypeId] = useState<string | null>(null);
    const [typeDependencies, setTypeDependencies] = useState<
        Record<string, number>
    >({});

    // Form state
    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadTypeDependencies = async (typesList: Type[]) => {
        try {
            const dependencies: Record<string, number> = {};

            for (const type of typesList) {
                const result = await checkTypeForDeletionAction(
                    parseInt(type.id),
                );
                dependencies[type.id] = result.demandesCount;
            }

            setTypeDependencies(dependencies);
        } catch (error) {
            console.error("Erreur lors du chargement des dépendances:", error);
        }
    };

    const fetchData = async () => {
        try {
            setIsLoading(true);
            // TODO: Replace with actual API call to fetch types
            // Mock data for now
            const mockTypes: Type[] = [
                {
                    id: "1",
                    name: "Maintenance Préventive",
                    description: "Maintenance planifiée et régulière",
                    createdAt: "2025-01-15",
                },
                {
                    id: "2",
                    name: "Maintenance Curative",
                    description: "Intervention suite à une panne",
                    createdAt: "2025-01-15",
                },
                {
                    id: "3",
                    name: "Installation",
                    description: "Installation de nouveaux équipements",
                    createdAt: "2025-01-20",
                },
            ];
            setTypes(mockTypes);

            // Charger les dépendances pour chaque type
            await loadTypeDependencies(mockTypes);
        } catch (error) {
            console.error("Erreur lors du chargement des types:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddType = async () => {
        if (!formData.name.trim()) {
            toast.error("Le nom du type est requis");
            return;
        }

        try {
            // TODO: Call API to add type
            const newType: Type = {
                id: Date.now().toString(),
                name: formData.name,
                description: formData.description,
                createdAt: new Date().toISOString().split("T")[0],
            };
            setTypes([...types, newType]);
            setFormData({ name: "", description: "" });
            setIsAddDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du type:", error);
        }
    };

    const handleEditType = async () => {
        if (!formData.name.trim() || !editingType) {
            toast.error("Le nom du type est requis");
            return;
        }

        try {
            // TODO: Call API to update type
            setTypes(
                types.map((t) =>
                    t.id === editingType.id
                        ? {
                              ...t,
                              name: formData.name,
                              description: formData.description,
                          }
                        : t,
                ),
            );
            setFormData({ name: "", description: "" });
            setEditingType(null);
            setIsEditDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de la modification du type:", error);
        }
    };

    const handleDeleteClick = async (type: Type) => {
        try {
            const checkResult = await checkTypeForDeletionAction(
                parseInt(type.id),
            );

            if (!checkResult.canDelete) {
                toast.warning(checkResult.message, {
                    description: `Veuillez d'abord supprimer ou réaffecter les ${checkResult.demandesCount} demande(s) associée(s).`,
                });
                return;
            }

            toast.error(`Supprimer ${type.name} ?`, {
                description:
                    "Cette action est irréversible. Cliquez sur Supprimer pour confirmer.",
                action: {
                    label: "Supprimer",
                    onClick: () => handleConfirmDelete(type),
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
            console.error("Erreur lors de la vérification du type:", error);
        }
    };

    const handleConfirmDelete = async (type: Type) => {
        setDeletingTypeId(type.id);
        try {
            await deleteTypeAction(parseInt(type.id));
            setTypes(types.filter((t) => t.id !== type.id));
            toast.success("Type supprimé", {
                description: `${type.name} a été supprimé avec succès.`,
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue";
            toast.error("Erreur lors de la suppression du type", {
                description: errorMessage,
            });
            console.error("Erreur lors de la suppression du type:", error);
        } finally {
            setDeletingTypeId(null);
        }
    };

    const openEditDialog = (type: Type) => {
        setEditingType(type);
        setFormData({
            name: type.name,
            description: type.description,
        });
        setIsEditDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({ name: "", description: "" });
        setEditingType(null);
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
                        Gestion des Types
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Créez et gérez les types de demandes de maintenance.
                    </p>
                </div>
                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                            <Plus className="w-5 h-5" />
                            Ajouter un Type
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Créer un nouveau type</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations du nouveau type de
                                demande.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-2">
                                    Nom du type *
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
                                    placeholder="Ex: Maintenance Préventive"
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    placeholder="Description du type..."
                                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none h-24"
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
                                    onClick={handleAddType}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Créer
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Types Table */}
            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-semibold">
                        Liste des Types ({types.length})
                    </h2>
                </div>

                {types.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileType className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg">
                            Aucun type trouvé.
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Commencez par en créer un en cliquant sur le bouton
                            &quot;Ajouter un Type&quot;.
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
                                        Description
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                        Date de création
                                    </th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900">
                                        Dépendances
                                    </th>
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {types.map((type) => {
                                    const dependencyCount =
                                        typeDependencies[type.id] || 0;
                                    const canDelete = dependencyCount === 0;

                                    return (
                                        <tr
                                            key={type.id}
                                            className={`border-b border-border transition-colors ${
                                                canDelete
                                                    ? "hover:bg-slate-50"
                                                    : "bg-orange-50/30"
                                            }`}
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                                {type.name}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {type.description || "-"}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-muted-foreground">
                                                {new Date(
                                                    type.createdAt,
                                                ).toLocaleDateString("fr-FR")}
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
                                                            editingType?.id ===
                                                                type.id
                                                        }
                                                        onOpenChange={(
                                                            open,
                                                        ) => {
                                                            if (
                                                                !open &&
                                                                editingType?.id ===
                                                                    type.id
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
                                                                        type,
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
                                                                    type
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Mettez à
                                                                    jour les
                                                                    informations
                                                                    du type.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                                                        Nom du
                                                                        type *
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
                                                                        placeholder="Ex: Maintenance Préventive"
                                                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                                                    />
                                                                </div>
                                                                <div>
                                                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                                                        Description
                                                                    </label>
                                                                    <textarea
                                                                        value={
                                                                            formData.description
                                                                        }
                                                                        onChange={(
                                                                            e,
                                                                        ) =>
                                                                            setFormData(
                                                                                {
                                                                                    ...formData,
                                                                                    description:
                                                                                        e
                                                                                            .target
                                                                                            .value,
                                                                                },
                                                                            )
                                                                        }
                                                                        placeholder="Description du type..."
                                                                        className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none h-24"
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
                                                                        onClick={
                                                                            handleEditType
                                                                        }
                                                                        className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                                                                    >
                                                                        Enregistrer
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </DialogContent>
                                                    </Dialog>

                                                    <button
                                                        onClick={() =>
                                                            handleDeleteClick(
                                                                type,
                                                            )
                                                        }
                                                        disabled={
                                                            !canDelete ||
                                                            deletingTypeId ===
                                                                type.id
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
