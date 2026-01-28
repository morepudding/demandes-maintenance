import {
    getEntityById,
    getAllEntities,
    createEntity,
    updateEntity,
    deleteEntity,
    checkEntityDependencies,
    getEntityCount,
    BaseEntityConfig,
    BaseEntity,
} from "./base.service";

export interface BudgetDemande extends BaseEntity {
    id: number;
    name: string;
}

const BUDGET_CONFIG: BaseEntityConfig = {
    tableName: "Budget_Demande",
    idColumn: "Budget_Dem_Id",
    nameColumn: "Budget_Dem_Libelle",
    dependencyTable: "Demande",
    dependencyColumn: "Dem_Budget_Demande",
    errorContext: "budget",
};

export const getBudgetById = async (
    budgetId: number,
): Promise<BudgetDemande | null> => {
    return getEntityById(budgetId, BUDGET_CONFIG);
};

export const getAllBudgets = async (): Promise<BudgetDemande[]> => {
    return getAllEntities(BUDGET_CONFIG);
};

export const createBudget = async (budgetName: string): Promise<void> => {
    return createEntity(budgetName, BUDGET_CONFIG);
};

export const updateBudget = async (
    budgetId: number,
    budgetName: string,
): Promise<void> => {
    return updateEntity(budgetId, budgetName, BUDGET_CONFIG);
};

export const deleteBudget = async (budgetId: number): Promise<void> => {
    return deleteEntity(budgetId, BUDGET_CONFIG);
};

export const checkBudgetDependencies = async (
    budgetId: number,
): Promise<{ hasDependencies: boolean; demandesCount: number }> => {
    return checkEntityDependencies(budgetId, BUDGET_CONFIG);
};

export const getBudgetsStats = async (): Promise<{
    totalBudgets: number;
    activeBudgets: number;
}> => {
    const totalBudgets = await getEntityCount(BUDGET_CONFIG);
    return {
        totalBudgets,
        activeBudgets: totalBudgets,
    };
};
