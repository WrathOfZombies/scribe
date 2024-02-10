import styled from "@emotion/styled";
import { rem } from "@mantine/core";
import { motion } from "framer-motion";

type BoxProps = Partial<typeof Box>;

const Box = styled(motion.div)``;

type FlexProps = BoxProps & {
  gap?: number;
  margin?: string;
  padding?: string;
  width?: number;
  height?: number;
};

const Flex = styled(Box)`
  display: flex;
  gap: ${({ gap }: FlexProps) => gap && rem(gap)};
  margin: ${({ margin }: FlexProps) => margin};
  padding: ${({ padding }: FlexProps) => padding};
  width: ${({ width }: FlexProps) => width && rem(width)};
  height: ${({ height }: FlexProps) => height && rem(height)};
`;

type RowProps = FlexProps & {};

const Row = styled(Flex)`
  flex-direction: row;
`;

type ColumnProps = FlexProps & {};

const Column = styled(Flex)`
  flex-direction: column;
`;

export { Box, Column, Row };
export type { BoxProps, ColumnProps, FlexProps, RowProps };
