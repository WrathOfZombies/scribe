import styled from "@emotion/styled";
import { Button, rem } from "@mantine/core";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Panel } from "reactflow";
import { v4 } from "uuid";
import { shallow } from "zustand/shallow";
import { Row } from "../layout/box";
import useStore from "../store";
import { Store } from "../types";

const PanelWrapper = styled(motion.section)`
  margin: 0;
  padding: ${rem(16)};
  border-radius: ${rem(8)};
  width: min-content;
  background: var(--background);
  box-shadow: 0px 0px 10px 0px var(--mantine-color-gray-4);
`;

export type PanelWrapperProps = {
  children?: ReactNode;
};

const selector = (store: Store) => ({
  onAddNode: () => {
    store.onAddNode({
      id: v4(),
      type: "message",
      position: { x: 0, y: 0 },
      data: { label: "New Node", value: "New Node", content: "New Content" },
    });
  },
});

export const ControlPanel = ({ children }: PanelWrapperProps) => {
  const { onAddNode } = useStore(selector, shallow);

  return (
    <Panel position="top-left">
      <PanelWrapper>
        <Row gap={10}>
          <Button variant="outline" onClick={onAddNode}>
            Add
          </Button>
          <Button variant="outline">Run</Button>
          {children}
        </Row>
      </PanelWrapper>
    </Panel>
  );
};
