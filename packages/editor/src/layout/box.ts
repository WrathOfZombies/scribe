import styled from "@emotion/styled";
import { rem } from "@mantine/core";
import { motion } from "framer-motion";

type BoxProps = Partial<typeof Box>;

const Box = styled(motion.div)``;

type FlexProps = BoxProps & {
  gap?: number;
};

type RowProps = FlexProps & {};

const Row = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ gap }: RowProps) => gap && rem(gap)};
`;

type ColumnProps = FlexProps & {};

const Column = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: ${({ gap }: ColumnProps) => gap && rem(gap)};
`;

export { Box, Column, Row };
export type { BoxProps, ColumnProps, FlexProps, RowProps };
