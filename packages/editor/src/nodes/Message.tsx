import { NodeProps } from "reactflow";

import styled from "@emotion/styled";
import { rem, Text, Title } from "@mantine/core";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import { Column, Row } from "../layout/box";

const MessageWrapper = styled(motion.section)`
  margin: 0;
  padding: ${rem(16)};
  border-radius: ${rem(8)};
  background: var(--background);
  box-shadow: 0px 0px 10px 0px var(--mantine-color-gray-4);
`;

export type MessageProps<TProps> = TProps & {
  icon?: ReactNode;
  label?: string;
  title: string;
  children?: ReactNode;
};

export const Message = <TData, TProps = {}>({
  icon,
  label,
  title,
  children,
}: MessageProps<TProps> & NodeProps<TData>) => {
  return (
    <MessageWrapper>
      <Column>
        <Row>
          {icon}
          <Column>
            <Text c="gray" size="xs">
              {label}
            </Text>
            <Title size="s">{title}</Title>
          </Column>
        </Row>
        {children}
      </Column>
    </MessageWrapper>
  );
};
