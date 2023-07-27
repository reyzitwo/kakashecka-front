import type { Meta, StoryObj } from "@storybook/react";

import Badge from "./Badge";

const meta: Meta<typeof Badge> = {
  title: "Main/Badge",
  tags: ["autodocs"],
  component: Badge,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Circle: Story = {
  args: {
    mode: "circle",
    children: "1",
  },
};

export const Vertical: Story = {
  args: {
    mode: "vertical",
    children: "ADS",
  },
};
