import type { Meta, StoryObj } from "@storybook/react";

import Cell from "./Cell";

const meta: Meta<typeof Cell> = {
  title: "Main/Cell",
  tags: ["autodocs"],
  component: Cell,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHeader: Story = {
  args: {
    before: "1",
    after: "2",
    textSize: 2,
    className: "test",
  },
};
