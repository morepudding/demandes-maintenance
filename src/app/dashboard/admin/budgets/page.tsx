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
    deleteBudgetAction,
    checkBudgetForDeletionAction,
} from "@/app/actions/demandes";

interface Budget {
    id: string;
    name: string;
}

export default function BudgetManagementPage() {
    const [budgets, setBudgets] = useState<Budget[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
    const [isAddDialogOpen, setIsAddDialogOpen] = useState<boolean>(false);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState<boolean>(false);
    const [deletingBudgetId, setDeletingBudgetId] = useState<string | null>(
        null,
    );
    const [budgetDependencies, setBudgetDependencies] = useState<
        Record<string, number>
    >({});
    const [formData, setFormData] = useState<{ name: string }>({ name: "" });

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const loadBudgetDependencies = async (budgetsList: Budget[]) => {
        try {
            const dependencies: Record<string, number> = {};

            for (const budget of budgetsList) {
                const result = await checkBudgetForDeletionAction(
                    parseInt(budget.id),
                );
                dependencies[budget.id] = result.demandesCount;
            }

            setBudgetDependencies(dependencies);
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
            //TODO: add API call
            const mockBudgets: Budget[] = [
                { id: "1", name: "Budget A" },
                { id: "2", name: "Budget B" },
            ];
            setBudgets(mockBudgets);

            await loadBudgetDependencies(mockBudgets);
        } catch (error) {
            console.error("Erreur lors du chargement des budgets:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddBudget = async () => {
        if (!formData.name.trim()) {
            toast.error("Le nom du budget est requis.");
            return;
        }

        try {
            //TODO : add API call
            const newBudget: Budget = {
                id: Date.now().toString(),
                name: formData.name,
            };
            setBudgets([...budgets, newBudget]);
            setFormData({ name: "" });
            setIsAddDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de l'ajout du site:", error);
        }
    };

    const handleEditBudget = async () => {
        if (!formData.name.trim() || !editingBudget) {
            toast.error("Le nom du budget est requis.");
            return;
        }

        try {
            //TODO : add API call
            setBudgets(
                budgets.map((b) =>
                    b.id === editingBudget.id
                        ? {
                              ...b,
                              name: formData.name,
                          }
                        : b,
                ),
            );
            setFormData({ name: "" });
            setEditingBudget(null);
            setIsEditDialogOpen(false);
        } catch (error) {
            console.error("Erreur lors de la modification du budget:", error);
        }
    };

    const handleDeleteClick = async (budget: Budget) => {
        try {
            const checkResult = await checkBudgetForDeletionAction(
                parseInt(budget.id),
            );

            if (!checkResult.canDelete) {
                toast.warning(checkResult.message, {
                    description: `Veuillez d'abord supprimer ou réaffecter les ${checkResult.demandesCount} demande(s) associée(s).`,
                });
                return;
            }

            toast.error(`Supprimer ${budget.name} ?`, {
                description: "Cette action est irréversible.",
                action: {
                    label: "Supprimer",
                    onClick: () => handleConfirmDelete(budget),
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
            console.error("Erreur lors de la vérification du budget :", error);
        }
    };

    const handleConfirmDelete = async (budget: Budget) => {
        setDeletingBudgetId(budget.id);
        try {
            await deleteBudgetAction(parseInt(budget.id));
            setBudgets(budgets.filter((b) => b.id !== budget.id));
            toast.success("Budget supprimé.", {
                description: `${budget.name} a été supprimé avec succès.`,
            });
        } catch (error) {
            const errorMessage =
                error instanceof Error
                    ? error.message
                    : "Une erreur est survenue";
            toast.error("Erreur lors de la suppression du budget", {
                description: errorMessage,
            });
            console.error("Erreur lors de la suppression du budget:", error);
        } finally {
            setDeletingBudgetId(null);
        }
    };

    const openEditDialog = (budget: Budget) => {
        setEditingBudget(budget);
        setFormData({ name: budget.name });
        setIsEditDialogOpen(true);
    };

    const resetForm = () => {
        setFormData({ name: "" });
        setEditingBudget(null);
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
                        Gestion des budgets
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Créez et gérez les budgets.
                    </p>
                </div>

                <Dialog
                    open={isAddDialogOpen}
                    onOpenChange={setIsAddDialogOpen}
                >
                    <DialogTrigger asChild>
                        <button className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                            <Plus className="w-5 h-5" />
                            Ajouter un Budget
                        </button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Créer un nouveau budget</DialogTitle>
                            <DialogDescription>
                                Remplissez les informations du nouveau budget.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-900 mb-2">
                                    Nom du budget *
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
                                    placeholder="Ex: Budget Marketing"
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
                                    onClick={handleAddBudget}
                                    className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors font-medium"
                                >
                                    Créer
                                </button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
                <div className="p-6 border-b border-border">
                    <h2 className="text-lg font-semibold">
                        Liste des Budgets ({budgets.length})
                    </h2>
                </div>

                {budgets.length === 0 ? (
                    <div className="p-12 text-center">
                        <FileType className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                        <p className="text-muted-foreground text-lg">
                            Aucun budget trouvé.
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Commencez par en créer un en cliquant sur le bouton
                            &quot;Ajouter un Budget&quot;.
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
                                    <th className="px-6 py-3 text-right text-sm font-semibold text-slate-900">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {budgets.map((budget) => {
                                    const dependencyCount =
                                        budgetDependencies[budget.id] || 0;
                                    const canDelete = dependencyCount === 0;

                                    return (
                                        <tr
                                            key={budget.id}
                                            className={`border-b border-border transition-colors ${canDelete ? "hover:bg-slate-50" : "bg-orange-50/30"}`}
                                        >
                                            <td className="px-6 py-4 text-sm font-medium text-slate-900">
                                                {budget.name}
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
                                                            editingBudget?.id ===
                                                                budget.id
                                                        }
                                                        onOpenChange={(
                                                            open,
                                                        ) => {
                                                            if (
                                                                !open &&
                                                                editingBudget?.id ===
                                                                    budget.id
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
                                                                        budget,
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
                                                                    budget
                                                                </DialogTitle>
                                                                <DialogDescription>
                                                                    Mettez à
                                                                    jour les
                                                                    informations
                                                                    du budget.
                                                                </DialogDescription>
                                                            </DialogHeader>
                                                            <div className="space-y-4">
                                                                <div>
                                                                    <label className="block text-sm font-medium text-slate-900 mb-2">
                                                                        Nom du
                                                                        budget *
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
                                                                        placeholder="Ex: Budget Marketing"
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
                                                                            handleEditBudget();
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
                                                                budget,
                                                            );
                                                        }}
                                                        disabled={
                                                            !canDelete ||
                                                            deletingBudgetId ===
                                                                budget.id
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
