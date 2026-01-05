"use client";

import ButtonsList from "@/components/molecules/ButtonsList";
import { PopUp } from "@/components/molecules/PopUp";
import { useState } from "react";
import DataTable, { DataTableProps } from "../DataTable";

type EditTableProps = DataTableProps & {
    exportLabel?: string;
    exportData?: PopUp;
    exportOptions?: {
        onExport?: (onProceedChange: boolean) => void;
    };
    editOptions: {
        onEdit?: (data: Record<string, string>, id: number) => void;
        editIds?: number[];
    };
    createOptions: {
        label?: string;
        onCreate?: (data: Record<string, string>) => void;
        isDisabled?: boolean;
    };
    validateOptions?: {
        label?: string;
        onValidate?: (data: Record<string, string>) => void;
        isDisabled?: boolean;
        isLoading?: boolean;
        isDone?: boolean;
    };
};

export default function EditTable({
    columnsDefinition,
    rows,
    exportLabel,
    exportData,
    exportOptions = {},
    createOptions = {},
    editOptions = {},
    validateOptions = {},
}: EditTableProps) {
    const { onEdit, editIds } = editOptions;
    const { onCreate } = createOptions;
    const { onValidate } = validateOptions;

    const [createMode, setCreateMode] = useState<boolean>(false);
    const [createData, setCreateData] = useState({});

    const [editMode, setEditMode] = useState<number | null>(null);
    const [editData, setEditData] = useState<Record<string, unknown>>({});

    const [validateData, setValidateData] = useState<Record<string, string>>(
        {},
    );

    const buttonsActions = [
        {
            ...createOptions,
            action: () => setCreateMode(true),
        },
        {
            ...validateOptions,
            action: () => onValidateAction(),
            isDisabled: Object.keys(validateData).length === 0,
        },
        {
            label: exportLabel,
            popupOptions: exportData,
            action: () => onValidationExport(true),
        },
    ];

    const createRowDefinition = Object.values(columnsDefinition).sort(
        (a, b) => (a?.order || 0) - (b?.order || 0),
    );

    const onChange =
        (inputKey: string, isCheckboxOrSelect: boolean) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setCreateData((prev) => {
                const newCreateData = structuredClone(prev);

                return {
                    ...newCreateData,
                    [inputKey]: isCheckboxOrSelect ? event : event.target.value,
                };
            });
        };

    const onEditChange =
        (inputKey: string, isCheckboxOrSelect: boolean) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setEditData((prev) => {
                const newEditData = structuredClone(prev);
                return {
                    ...newEditData,
                    [inputKey]: isCheckboxOrSelect ? event : event.target.value,
                };
            });
        };

    const onValidateCheckboxChange =
        (isCheckboxOrSelect: boolean, idRow: number) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setValidateData((prev) => {
                const newValidateData = structuredClone(prev);
                return {
                    ...newValidateData,
                    [idRow]: isCheckboxOrSelect ? event : event.target.value,
                };
            });
        };

    const onSaveAction = () => {
        onCreate?.(createData);
        setCreateMode(false);
        setCreateData({});
    };

    const onSaveEditAction = () => {
        if (onEdit && editMode) {
            const stringEditData: Record<string, string> = Object.fromEntries(
                Object.entries(editData).map(([key, value]) => [
                    key,
                    String(value ?? ""),
                ]),
            );
            onEdit(stringEditData, editMode);
        }
        setEditMode(null);
    };

    const onValidateAction = () => {
        onValidate?.(validateData);
    };

    const onValidationExport = (onProceedChange: boolean) => {
        if (onProceedChange) {
            exportOptions?.onExport?.(onProceedChange);
        }
    };

    return (
        <div>
            <div className="shadow-lg overflow-hidden">
                <DataTable
                    columnsDefinition={columnsDefinition}
                    rows={[
                        ...rows.map((row, indexMap) => {
                            const { key, cells } = row;

                            if (editIds && editMode === editIds[indexMap]) {
                                const editableRow = cells.map((champs) => {
                                    if (champs.notEditable) {
                                        return {
                                            key: champs.key,
                                            value: champs.value,
                                        };
                                    }
                                    if (champs.isCheckbox) {
                                        return {
                                            key: champs.key,
                                            isCheckbox: true,
                                            checkboxArgs: {
                                                checked: editData[champs.key],
                                                onCheckedChange: onEditChange(
                                                    champs.key,
                                                    true,
                                                ),
                                            },
                                        };
                                    }

                                    if (champs.isEditSelect) {
                                        const selectedOption =
                                            columnsDefinition[
                                                champs.key
                                            ]?.selectArray?.find(
                                                (option) =>
                                                    option.value ===
                                                    editData[champs.key],
                                            );

                                        return {
                                            key: champs.key,
                                            isSelect: true,
                                            selectArgs: {
                                                value: selectedOption?.value,
                                                onValueChange: onEditChange(
                                                    champs.key,
                                                    true,
                                                ),
                                            },
                                        };
                                    }

                                    return {
                                        key: champs.key,
                                        isInput: true,
                                        inputArgs: {
                                            value: editData[champs.key],
                                            onChange: onEditChange(
                                                champs.key,
                                                false,
                                            ),
                                        },
                                    };
                                });
                                return {
                                    key,
                                    cells: [
                                        ...editableRow,
                                        {
                                            key: "save",
                                            isButton: true,
                                            buttonArgs: {
                                                label: "Sauvegarder",
                                                onClick: () => {
                                                    onSaveEditAction();
                                                },
                                            },
                                        },
                                    ],
                                };
                            }

                            return {
                                ...row,
                                cells: [
                                    ...cells.map((cell) => {
                                        if (
                                            cell.isCheckbox &&
                                            cell.useChangeFunction
                                        ) {
                                            let checked =
                                                cell?.checkboxArgs?.checked;
                                            if (
                                                editIds &&
                                                editIds[indexMap] &&
                                                validateData[
                                                    editIds[indexMap]
                                                ] !== undefined
                                            ) {
                                                checked =
                                                    validateData[
                                                        editIds[indexMap]
                                                    ];
                                            }
                                            return {
                                                ...cell,
                                                checkboxArgs: {
                                                    ...cell?.checkboxArgs,
                                                    checked,
                                                    onCheckedChange:
                                                        onValidateCheckboxChange(
                                                            true,
                                                            editIds
                                                                ? editIds[
                                                                      indexMap
                                                                  ]
                                                                : 0,
                                                        ),
                                                },
                                            };
                                        }

                                        return cell;
                                    }),
                                    {
                                        key: "edit",
                                        isButton: true,
                                        buttonArgs: {
                                            label: "Editer",
                                            onClick: () => {
                                                setEditMode(
                                                    editIds
                                                        ? editIds[indexMap]
                                                        : null,
                                                );
                                                setEditData((prev) => {
                                                    let newEditData =
                                                        structuredClone(prev);

                                                    cells.map((champs) => {
                                                        newEditData = {
                                                            ...newEditData,
                                                            [champs.key]:
                                                                champs.isCheckbox
                                                                    ? champs
                                                                          .checkboxArgs
                                                                          ?.checked
                                                                    : champs.value,
                                                        };
                                                    });

                                                    return newEditData;
                                                });
                                            },
                                        },
                                    },
                                ],
                            };
                        }),
                    ]}
                    newRow={
                        createMode && {
                            key: "createRow",
                            cells: [
                                ...createRowDefinition.map(
                                    ({
                                        key,
                                        onCreateEmpty,
                                        onCreateCheckbox,
                                        onCreateSelect,
                                        name,
                                    }) =>
                                        getCreateCellProp({
                                            key,
                                            onCreateEmpty,
                                            onCreateCheckbox,
                                            onCreateSelect,
                                            name,
                                            createData,
                                            onChange,
                                        }),
                                ),
                                {
                                    key: "save",
                                    isButton: true,
                                    buttonArgs: {
                                        onClick: onSaveAction,
                                        label: "Sauvegarder",
                                    },
                                },
                            ],
                        }
                    }
                />
            </div>

            <div className="flex flex-col items-end pt-6">
                <ButtonsList actions={buttonsActions} />
            </div>
        </div>
    );
}

type CreateCellProp = {
    key: string;
    onCreateEmpty?: boolean;
    onCreateCheckbox?: boolean;
    onCreateSelect?: boolean;
    name: string;
    createData: Record<string, string>;
    onChange: (
        key: string,
        isCheckbox: boolean,
    ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const getCreateCellProp = ({
    key,
    onCreateEmpty,
    onCreateCheckbox,
    onCreateSelect,
    name,
    createData,
    onChange,
}: CreateCellProp) => {
    if (onCreateEmpty) {
        return { key, value: "" };
    }

    if (onCreateCheckbox) {
        return {
            key,
            isCheckbox: true,
            checkboxArgs: {
                onCheckedChange: onChange(key, true),
            },
        };
    }

    if (onCreateSelect) {
        return {
            key,
            isSelect: true,
            selectArgs: {
                onValueChange: onChange(key, true),
                optionsTable: createData[key],
            },
        };
    }

    return {
        isInput: true,
        inputArgs: {
            value: createData[key] || "",
            placeholder: name,
            onChange: onChange(key, false),
        },
        key,
    };
};
