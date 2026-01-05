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
import { Eye } from "lucide-react";
import { ReactNode } from "react";
import { URL } from "url";

export type DataTableColumnDefinition = {
    key: string;
    order?: number;
    name: string;

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
};

export type DataTableProps = {
    columnsDefinition: {
        [key: string]: DataTableColumnDefinition;
    };
    rows: DataTableRow[];
    newRow?: boolean | DataTableRow;
};

export default function DataTable({
    columnsDefinition,
    rows,
    newRow,
}: DataTableProps) {
    const headers = Object.entries(columnsDefinition).sort((a, b) => {
        if (!a[1].order) {
            return -1;
        }
        if (!b[1].order) {
            return 1;
        }
        return a[1].order - b[1].order;
    });

    return (
        <Table className="inset-ring inset-ring-gray-300 rounded-lg overflow-hidden bg-gray-200">
            <TableHeader>
                <TableRow>
                    {headers.map(([headerKey, headerDefinition]) => (
                        <TableHead
                            className="text-black pl-5 py-2"
                            key={`header-${headerKey}`}
                        >
                            {headerDefinition.name}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.map(({ key, cells }) => (
                    <TableRow key={`row-${key}`}>
                        {cells.map(({ key, ...cellProps }) => (
                            <TableCell
                                className="pl-5 py-2.5 bg-white"
                                key={`row-${key}-cell-${key}`}
                            >
                                <TableCellRender
                                    {...cellProps}
                                    definition={columnsDefinition[key]}
                                />
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
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
