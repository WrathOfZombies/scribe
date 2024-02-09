import styled from "@emotion/styled";
import { rem } from "@mantine/core";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const Panel = styled(motion.section)`
  margin: 0;
  padding: ${rem(16)};
  border-radius: ${rem(8)};
  width: min-content;
  background: var(--background);
  box-shadow: 0px 0px 10px 0px var(--mantine-color-gray-4);
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

export type PanelWrapperProps = {
  children?: ReactNode;
};

export const PanelWrapper = ({ children }: PanelWrapperProps) => {
  return (
    <Panel>
      <Column>{children}</Column>
    </Panel>
  );
};
