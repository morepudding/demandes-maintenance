import type { Meta, StoryObj } from "@storybook/react";
import { StatusBadge } from "./index";

const meta = {
    title: "Atoms/StatusBadge",
    component: StatusBadge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        status: {
            control: "select",
            options: ["En attente", "Validé", "Refusé", "Abandonné"],
        },
    },
} satisfies Meta<typeof StatusBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EnAttente: Story = {
    args: {
        status: "En attente",
    },
};

export const Valide: Story = {
    args: {
        status: "Validé",
    },
};

export const Refuse: Story = {
    args: {
        status: "Refusé",
    },
};

export const Abandonne: Story = {
    args: {
        status: "Abandonné",
    },
};

export const AllStatuses: Story = {
    args: {
        status: "En attente",
    },
    render: () => (
        <div className="flex gap-2 flex-wrap">
            <StatusBadge status="En attente" />
            <StatusBadge status="Validé" />
            <StatusBadge status="Refusé" />
            <StatusBadge status="Abandonné" />
        </div>
    ),
};
