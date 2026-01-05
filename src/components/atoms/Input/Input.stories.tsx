import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Input } from ".";

const meta: Meta<typeof Input> = {
    title: "ui/atoms/Input",
    component: Input,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { onChange: fn() },
    argTypes: {
        type: {
            control: "select",
            options: ["text", "email", "password", "number", "tel", "url"],
        },
    },
};

export default meta;
type Story = StoryObj<typeof Input>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        type: "text",
        placeholder: "This is a placeholder",
        disabled: false,
    },
};
