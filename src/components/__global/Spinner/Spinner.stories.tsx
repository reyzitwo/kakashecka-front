import type { Meta, StoryObj } from "@storybook/react";

import Spinner from "./Spinner";

const meta: Meta<typeof Spinner> = {
  title: "Main/Spinner",
  tags: ["autodocs"],
  component: Spinner,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Large: Story = {
  args: {
    size: "large",
  },
};

export const Medium: Story = {
  args: {
    size: "medium",
  },
};

export const Regular: Story = {
  args: {
    size: "regular",
  },
};

export const Small: Story = {
  args: {
    size: "small",
  },
};
