import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./index";

const meta = {
    title: "Atoms/Badge",
    component: Badge,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Badge par défaut",
    },
};

export const Success: Story = {
    args: {
        variant: "success",
        children: "Succès",
    },
};

export const Warning: Story = {
    args: {
        variant: "warning",
        children: "Attention",
    },
};

export const Error: Story = {
    args: {
        variant: "error",
        children: "Erreur",
    },
};

export const Outline: Story = {
    args: {
        variant: "outline",
        children: "Contour",
    },
};

export const AllVariants: Story = {
    render: () => (
        <div className="flex gap-2 flex-wrap">
            <Badge>Default</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
            <Badge variant="outline">Outline</Badge>
        </div>
    ),
};
