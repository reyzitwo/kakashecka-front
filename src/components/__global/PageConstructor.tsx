import { ReactNode, Suspense } from "react";

import { Panel } from "@vkontakte/vkui";
import { Group } from "src/components/__global";

interface PageI {
  id: string;
  centered?: boolean;
  paddingLevel?: 1 | 2;
  header?: string;
  isSomeGroups?: boolean;
  className?: string;
  children: ReactNode;
}

const Page = ({
  id,
  centered = false,
  paddingLevel = 1,
  header = "",
  className,
  isSomeGroups,
  children,
}: PageI) => {
  const content = <Suspense fallback={""}>{children}</Suspense>;

  return (
    <Panel id={id} centered={centered}>
      {isSomeGroups ? (
        content
      ) : (
        <Group
          paddingLevel={paddingLevel}
          header={{ text: header, mode: "center", background: "blue" }}
          className={className}
        >
          {content}
        </Group>
      )}
    </Panel>
  );
};

export default Page;
