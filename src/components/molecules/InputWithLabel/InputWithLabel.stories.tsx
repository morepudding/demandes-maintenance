import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { InputWithLabel } from ".";

const meta: Meta<typeof InputWithLabel> = {
    title: "ui/molecules/InputWithLabel",
    component: InputWithLabel,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    args: { inputProps: { onChange: fn() } },
    argTypes: {
        inputProps: {},
    },
};

export default meta;
type Story = StoryObj<typeof InputWithLabel>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary: Story = {
    args: {
        labelContent: "This is a label",
        inputProps: {
            type: "text",
            placeholder: "This is a placeholder",
            disabled: false,
        },
    },
};
