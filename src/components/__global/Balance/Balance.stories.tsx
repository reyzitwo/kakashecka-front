import type { Meta, StoryObj } from "@storybook/react";

import Balance from "./Balance";

const meta: Meta<typeof Balance> = {
  title: "Main/Balance",
  tags: ["autodocs"],
  component: Balance,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const hello: Story = {
  args: {
    balance: 12,
  },
};
