import type { Meta, StoryObj } from "@storybook/react";
import DataTable from ".";
import { MOCK_DATA_DATA_TABLE } from "./mock";

type DataTableProps = React.ComponentProps<typeof DataTable>;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<DataTableProps> = {
    title: "ui/organisms/DataTable",
    component: DataTable,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
        layout: "centered",
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<DataTableProps>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const SimpleTable: Story = {
    args: {
        columnsDefinition: {
            boat: {
                order: 1,
                name: "Bateau",
                key: "boatCode",
            },
            designation: {
                order: 2,
                name: "Désignation",
                key: "boatDescription",
            },
            designationspp: {
                order: 2,
                name: "Désignation SPP",
                key: "sppBoatDescription",
            },
        },
        rows: MOCK_DATA_DATA_TABLE,
    },
};
