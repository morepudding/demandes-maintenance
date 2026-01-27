"use client";

import { Button } from "@/components/atoms/Button";
import { Checkbox } from "@/components/atoms/Chekbox";
import { Input } from "@/components/atoms/Input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/atoms/Select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/atoms/Table";
import ButtonLink, {
    ButtonsActionLink,
} from "@/components/molecules/ButtonLink";
import ButtonWithIcon from "@/components/molecules/ButtonWithIcon";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/molecules/ToolTip";
import {
    Eye,
    ArrowUpDown,
    ArrowUp,
    ArrowDown,
    X,
    ChevronLeft,
    ChevronRight,
    Edit,
    Trash2,
} from "lucide-react";
import { ReactNode, useState } from "react";
import { URL } from "url";

export type SortDirection = "asc" | "desc" | null;

export type FilterType = "text" | "select" | "number" | "date";

export type DataTableColumnDefinition = {
    key: string;
    order?: number;
    name: string;
    sortable?: boolean;
    filterable?: boolean;
    filterType?: FilterType;

    onCreateEmpty?: boolean;
    onCreateCheckbox?: boolean;
    onCreateSelect?: boolean;

    selectArray?: {
        id: number;
        value: string;
    }[];
};

export type DataTableCell = {
    render?: ({}) => ReactNode;
    value?: string | number | null;
    args?: {
        [key: string]: unknown;
    };
    isInput?: boolean;
    inputArgs?: {
        [key: string]: unknown;
    };
    isButton?: boolean;
    buttonArgs?: {
        [key: string]: unknown;
        label?: string;
    };
    isCheckbox?: boolean;
    checkboxArgs?: {
        [key: string]: unknown;
    };
    isSelect?: boolean;
    isEditSelect?: boolean;
    selectArgs?: {
        [key: string]: unknown;
    };
    notEditable?: boolean;
    isButtonLink?: boolean;
    buttonLinkArgs?: {
        [key: string]: unknown;
        label: string;
        href: URL | string;
        action?: () => void;
    };
    isButtonWithIcon?: boolean;
    definition?: DataTableColumnDefinition;
    useChangeFunction?: boolean;
    isToolTip?: boolean;
    toolTipArgs?: {
        [key: string]: unknown;
        label: string;
        content: string;
    };
};

export type DataTableRow = {
    key: string;
    cells: (DataTableCell & { key: string })[];
    disableEdit?: boolean;
    disableDelete?: boolean;
};

export type DataTableProps = {
    columnsDefinition: {
        [key: string]: DataTableColumnDefinition;
    };
    rows: DataTableRow[];
    newRow?: boolean | DataTableRow;
    onSortChange?: (columnKey: string, direction: SortDirection) => void;
    onFilterChange?: (filters: Record<string, string | number | null>) => void;
    onPaginationChange?: (page: number, pageSize: number) => void;
    defaultPageSize?: number;
    showActions?: boolean;
    onEdit?: (row: DataTableRow) => void;
    onDelete?: (row: DataTableRow) => void;
};

export default function DataTable({
    columnsDefinition,
    rows,
    newRow,
    onSortChange,
    onFilterChange,
    onPaginationChange,
    defaultPageSize = 10,
    showActions = false,
    onEdit,
    onDelete,
}: DataTableProps) {
    const [sortColumn, setSortColumn] = useState<string | null>(null);
    const [sortDirection, setSortDirection] = useState<SortDirection>(null);
    const [filters, setFilters] = useState<
        Record<string, string | number | null>
    >({});
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize);

    const headers = Object.entries(columnsDefinition).sort((a, b) => {
        if (!a[1].order) {
            return -1;
        }
        if (!b[1].order) {
            return 1;
        }
        return a[1].order - b[1].order;
    });

    const handleSort = (columnKey: string, isSortable: boolean | undefined) => {
        if (!isSortable) return;

        let newDirection: SortDirection = "asc";
        if (sortColumn === columnKey) {
            if (sortDirection === "asc") {
                newDirection = "desc";
            } else if (sortDirection === "desc") {
                newDirection = null;
            }
        }

        setSortColumn(newDirection ? columnKey : null);
        setSortDirection(newDirection);
        onSortChange?.(columnKey, newDirection);
    };

    const getSortedRows = () => {
        if (!sortColumn || !sortDirection) {
            return rows;
        }

        return [...rows].sort((a, b) => {
            const aCell = a.cells.find((c) => c.key === sortColumn);
            const bCell = b.cells.find((c) => c.key === sortColumn);

            const aValue = aCell?.value ?? "";
            const bValue = bCell?.value ?? "";

            // Handle numeric values
            const aNum = Number(aValue);
            const bNum = Number(bValue);

            if (!isNaN(aNum) && !isNaN(bNum)) {
                return sortDirection === "asc" ? aNum - bNum : bNum - aNum;
            }

            // Handle string values
            const aStr = String(aValue).toLowerCase();
            const bStr = String(bValue).toLowerCase();

            if (sortDirection === "asc") {
                return aStr.localeCompare(bStr);
            } else {
                return bStr.localeCompare(aStr);
            }
        });
    };

    const sortedRows = getSortedRows();

    const handleFilterChange = (
        columnKey: string,
        value: string | number | null,
    ) => {
        const newFilters = { ...filters, [columnKey]: value };
        if (value === null || value === "") {
            delete newFilters[columnKey];
        } else {
            newFilters[columnKey] = value;
        }
        setFilters(newFilters);
        onFilterChange?.(newFilters);
    };

    const getFilteredAndSortedRows = () => {
        let result = sortedRows;

        // Apply filters
        if (Object.keys(filters).length > 0) {
            result = result.filter((row) => {
                return Object.entries(filters).every(
                    ([columnKey, filterValue]) => {
                        const cell = row.cells.find((c) => c.key === columnKey);
                        if (!cell) return true;

                        const cellValue = String(
                            cell.value ?? "",
                        ).toLowerCase();
                        const filterStr = String(filterValue).toLowerCase();

                        // Simple substring match - can be enhanced with operators
                        return cellValue.includes(filterStr);
                    },
                );
            });
        }

        return result;
    };

    const filteredAndSortedRows = getFilteredAndSortedRows();
    const hasActiveFilters = Object.keys(filters).length > 0;

    // Pagination logic
    const totalRows = filteredAndSortedRows.length;
    const totalPages = Math.ceil(totalRows / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedRows = filteredAndSortedRows.slice(startIndex, endIndex);

    const handlePageChange = (page: number) => {
        const validPage = Math.max(1, Math.min(page, totalPages || 1));
        setCurrentPage(validPage);
        onPaginationChange?.(validPage, pageSize);
    };

    const handlePageSizeChange = (newPageSize: number) => {
        setPageSize(newPageSize);
        setCurrentPage(1); // Reset to first page
        onPaginationChange?.(1, newPageSize);
    };

    return (
        <div className="space-y-4">
            {/* Filter Toggle Button */}
            <div className="flex items-center justify-between">
                <Button
                    onClick={() => setShowFilters(!showFilters)}
                    variant={hasActiveFilters ? "default" : "outline"}
                    className="gap-2"
                >
                    Filters{" "}
                    {hasActiveFilters && `(${Object.keys(filters).length})`}
                </Button>
                {hasActiveFilters && (
                    <Button
                        onClick={() => {
                            setFilters({});
                            onFilterChange?.({});
                        }}
                        variant="ghost"
                        size="sm"
                        className="gap-2"
                    >
                        <X size={16} /> Clear Filters
                    </Button>
                )}
            </div>

            {/* Filter Panel */}
            {showFilters && (
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-300 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {headers.map(([columnKey, columnDefinition]) => {
                            if (!columnDefinition.filterable) return null;

                            return (
                                <div
                                    key={`filter-${columnKey}`}
                                    className="space-y-2"
                                >
                                    <label className="text-sm font-medium text-gray-700">
                                        {columnDefinition.name}
                                    </label>

                                    {columnDefinition.filterType ===
                                    "select" ? (
                                        <Select
                                            value={
                                                (filters[
                                                    columnKey
                                                ] as string) || ""
                                            }
                                            onValueChange={(value) =>
                                                handleFilterChange(
                                                    columnKey,
                                                    value || null,
                                                )
                                            }
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="All" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="">
                                                    All
                                                </SelectItem>
                                                {columnDefinition.selectArray?.map(
                                                    (option) => (
                                                        <SelectItem
                                                            key={`${columnKey}-${option.id}`}
                                                            value={option.value}
                                                        >
                                                            {option.value}
                                                        </SelectItem>
                                                    ),
                                                )}
                                            </SelectContent>
                                        </Select>
                                    ) : (
                                        <Input
                                            type={
                                                columnDefinition.filterType ===
                                                "number"
                                                    ? "number"
                                                    : columnDefinition.filterType ===
                                                        "date"
                                                      ? "date"
                                                      : "text"
                                            }
                                            placeholder={`Filter by ${columnDefinition.name.toLowerCase()}`}
                                            value={
                                                (filters[
                                                    columnKey
                                                ] as string) || ""
                                            }
                                            onChange={(e) =>
                                                handleFilterChange(
                                                    columnKey,
                                                    e.target.value || null,
                                                )
                                            }
                                        />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Table */}
            <Table className="inset-ring inset-ring-gray-300 rounded-lg overflow-hidden bg-gray-200">
                <TableHeader>
                    <TableRow>
                        {headers.map(([headerKey, headerDefinition]) => (
                            <TableHead
                                className={`text-black pl-5 py-2 ${
                                    headerDefinition.sortable
                                        ? "cursor-pointer hover:bg-gray-300 transition-colors"
                                        : ""
                                }`}
                                key={`header-${headerKey}`}
                                onClick={() =>
                                    handleSort(
                                        headerKey,
                                        headerDefinition.sortable,
                                    )
                                }
                            >
                                <div className="flex items-center gap-2">
                                    {headerDefinition.name}
                                    {headerDefinition.sortable && (
                                        <span className="inline-block">
                                            {sortColumn === headerKey ? (
                                                sortDirection === "asc" ? (
                                                    <ArrowUp size={16} />
                                                ) : (
                                                    <ArrowDown size={16} />
                                                )
                                            ) : (
                                                <ArrowUpDown
                                                    size={16}
                                                    className="text-gray-400"
                                                />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </TableHead>
                        ))}
                        {showActions && (
                            <TableHead className="text-black pl-5 py-2 text-right">
                                Actions
                            </TableHead>
                        )}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {paginatedRows.map((row) => (
                        <TableRow key={`row-${row.key}`}>
                            {row.cells.map(({ key, ...cellProps }) => (
                                <TableCell
                                    className="pl-5 py-2.5 bg-white"
                                    key={`row-${row.key}-cell-${key}`}
                                >
                                    <TableCellRender
                                        {...cellProps}
                                        definition={columnsDefinition[key]}
                                    />
                                </TableCell>
                            ))}
                            {showActions && (
                                <TableCell className="pl-5 py-2.5 bg-white text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {onEdit && !row.disableEdit && (
                                            <Button
                                                onClick={() => onEdit(row)}
                                                variant="ghost"
                                                size="sm"
                                                className="gap-2"
                                                title="Edit"
                                            >
                                                <Edit size={16} />
                                            </Button>
                                        )}
                                        {onDelete && !row.disableDelete && (
                                            <Button
                                                onClick={() => onDelete(row)}
                                                variant="ghost"
                                                size="sm"
                                                className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                title="Delete"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            )}
                        </TableRow>
                    ))}
                    {paginatedRows.length === 0 &&
                        filteredAndSortedRows.length === 0 && (
                            <TableRow>
                                <TableCell
                                    colSpan={
                                        headers.length + (showActions ? 1 : 0)
                                    }
                                    className="text-center py-8 text-gray-500"
                                >
                                    No data found
                                </TableCell>
                            </TableRow>
                        )}
                    {typeof newRow === "object" && (
                        <TableRow>
                            {newRow.cells.map(({ key, ...cellProps }) => (
                                <TableCell
                                    className="pl-5 py-2.5 bg-white"
                                    key={`cell-${key}`}
                                >
                                    <TableCellRender
                                        {...cellProps}
                                        definition={columnsDefinition[key]}
                                    />
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {/* Pagination Footer */}
            {totalRows > 0 && (
                <div className="flex items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-300">
                    <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-700">
                            Rows per page:
                        </span>
                        <Select
                            value={pageSize.toString()}
                            onValueChange={(value) =>
                                handlePageSizeChange(parseInt(value))
                            }
                        >
                            <SelectTrigger className="w-[100px]">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 10, 20, 50, 100].map((size) => (
                                    <SelectItem
                                        key={size}
                                        value={size.toString()}
                                    >
                                        {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="text-sm text-gray-700">
                        Showing {startIndex + 1} to{" "}
                        {Math.min(endIndex, totalRows)} of {totalRows}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button
                            onClick={() => handlePageChange(currentPage - 1)}
                            disabled={currentPage === 1}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            <ChevronLeft size={16} /> Previous
                        </Button>

                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-700">
                                Page {currentPage} of {totalPages || 1}
                            </span>
                        </div>

                        <Button
                            onClick={() => handlePageChange(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            variant="outline"
                            size="sm"
                            className="gap-2"
                        >
                            Next <ChevronRight size={16} />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}

const TableCellRender = ({
    value,
    render,
    args,
    isInput,
    inputArgs,
    isButton,
    buttonArgs,
    isCheckbox,
    checkboxArgs,
    isButtonLink,
    buttonLinkArgs,
    isButtonWithIcon,
    isSelect,
    definition,
    selectArgs,
    isToolTip,
    toolTipArgs,
}: DataTableCell) => {
    if (render) {
        return <>{render({ ...args })}</>;
    }

    if (isInput) {
        return <Input {...inputArgs} />;
    }

    if (isButton) {
        return <Button {...buttonArgs}>{buttonArgs?.label}</Button>;
    }

    if (isButtonLink) {
        const dataLink: ButtonsActionLink = {
            label: buttonLinkArgs?.label || "",
            href: buttonLinkArgs?.href,
        };
        return <ButtonLink linkActions={[dataLink]} />;
    }

    if (isButtonWithIcon) {
        const dataLink: ButtonsActionLink = {
            label: buttonLinkArgs?.label || "",
            action: buttonLinkArgs?.action,
        };
        return <ButtonWithIcon linkActions={[dataLink]} />;
    }

    if (isCheckbox) {
        return <Checkbox {...checkboxArgs} />;
    }

    if (isSelect) {
        return (
            <Select {...selectArgs}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={definition?.name} />
                </SelectTrigger>
                <SelectContent>
                    {definition?.selectArray?.map(
                        (option: { id: number; value: string }) => (
                            <SelectItem
                                key={option.id + option.value}
                                value={option.value}
                            >
                                {option.value}
                            </SelectItem>
                        ),
                    )}
                </SelectContent>
            </Select>
        );
    }

    if (isToolTip) {
        return (
            <Tooltip>
                <TooltipTrigger className="cursor-not-allowed text-gray-400 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-9 px-4 py-2">
                    <Eye /> {toolTipArgs?.label}
                </TooltipTrigger>
                <TooltipContent>{toolTipArgs?.content}</TooltipContent>
            </Tooltip>
        );
    }

    return <>{value}</>;
};
