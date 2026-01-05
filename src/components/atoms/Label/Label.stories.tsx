import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Label } from ".";

const meta: Meta<typeof Label> = {
    title: "ui/atoms/Label",
    component: Label,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { onChange: fn() },
};

export default meta;
type Story = StoryObj<typeof Label>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        children: "This is a label",
    },
};
