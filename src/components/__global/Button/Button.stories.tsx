import type { Meta, StoryObj } from "@storybook/react";

import Button from "./Button";

const meta: Meta<typeof Button> = {
  title: "Main/Button",
  tags: ["autodocs"],
  component: Button,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Blue: Story = {
  args: {
    color: "blue",
    children: "Button",
  },
};

export const White: Story = {
  args: {
    color: "white",
    children: "Button",
  },
};

export const Green: Story = {
  args: {
    color: "green",
    children: "Button",
  },
};

export const Orange: Story = {
  args: {
    color: "orange",
    children: "Button",
  },
};
