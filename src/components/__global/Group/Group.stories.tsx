import type { Meta, StoryObj } from "@storybook/react";

import Group from "./Group";

const meta: Meta<typeof Group> = {
  title: "Main/Group",
  tags: ["autodocs"],
  component: Group,
};

export default meta;
type Story = StoryObj<typeof meta>;

export const WithHeader: Story = {
  args: {
    header: { text: "Hello!", mode: "center", background: "orange" },
    children: "Test!",
  },
};
