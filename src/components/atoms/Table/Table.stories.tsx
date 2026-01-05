import type { Meta, StoryObj } from "@storybook/react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
} from ".";

type TableProps = React.ComponentProps<typeof Table>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<TableProps> = {
    title: "ui/atoms/Table",
    component: Table,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],

    render: ({ ...args }) => (
        <Table {...args}>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[200px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">INV001</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Credit Card</TableCell>
                    <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    ),
};

export default meta;
type Story = StoryObj<TableProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SimpleTable: Story = {
    args: { className: "" },
};
