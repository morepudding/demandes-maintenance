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

export interface TypeDemande extends BaseEntity {
    id: number;
    name: string;
}

const TYPE_CONFIG: BaseEntityConfig = {
    tableName: "Type_Demande",
    idColumn: "Type_Dem_Id",
    nameColumn: "Type_Dem_Libelle",
    dependencyTable: "Demande",
    dependencyColumn: "Dem_Type_Demande",
    errorContext: "type",
};

export const getTypeById = async (
    typeId: number,
): Promise<TypeDemande | null> => {
    return getEntityById(typeId, TYPE_CONFIG);
};

export const getAllTypes = async (): Promise<TypeDemande[]> => {
    return getAllEntities(TYPE_CONFIG);
};

export const createType = async (typeName: string): Promise<void> => {
    return createEntity(typeName, TYPE_CONFIG);
};

export const updateType = async (
    typeId: number,
    typeName: string,
): Promise<void> => {
    return updateEntity(typeId, typeName, TYPE_CONFIG);
};

export const deleteType = async (typeId: number): Promise<void> => {
    return deleteEntity(typeId, TYPE_CONFIG);
};

export const checkTypeDependencies = async (
    typeId: number,
): Promise<{ hasDependencies: boolean; demandesCount: number }> => {
    return checkEntityDependencies(typeId, TYPE_CONFIG);
};

export const getTypesStats = async (): Promise<{
    totalTypes: number;
    activeTypes: number;
}> => {
    const totalTypes = await getEntityCount(TYPE_CONFIG);
    return {
        totalTypes,
        activeTypes: totalTypes,
    };
};
