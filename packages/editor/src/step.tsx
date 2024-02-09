import { NodeProps } from "reactflow";

import styled from "@emotion/styled";
import { rem } from "@mantine/core";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const StepWrapper = styled(motion.section)`
  margin: 0;
  padding: ${rem(16)};
  border-radius: ${rem(8)};
  width: min-content;
  background: var(--background);
  box-shadow: 0px 0px 10px 0px var(--mantine-color-gray-4);
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${rem(8)};
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`;

const Label = styled.p`
  font-size: ${rem(10)};
  margin: 0;
  padding: 0;
  color: var(--mantine-color-gray-6);
`;

const Title = styled.h1`
  font-size: ${rem(14)};
  margin: 0;
  padding: 0;
  color: var(--mantine-color-gray-7);
  white-space: nowrap;
`;

export type StepProps<TProps> = TProps & {
  icon?: ReactNode;
  label?: string;
  title: string;
  children?: ReactNode;
};

export const Step = <TData, TProps = {}>({
  icon,
  label,
  title,
  children,
}: StepProps<TProps> & NodeProps<TData>) => {
  return (
    <StepWrapper>
      <Column>
        <Row>
          {icon}
          <Column>
            <Label>{label}</Label>
            <Title>{title}</Title>
          </Column>
        </Row>
        {children}
      </Column>
    </StepWrapper>
  );
};
