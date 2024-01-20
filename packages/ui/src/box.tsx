"use client";
import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface BoxProps {
  children: ReactNode;
}

const BoxInner = styled(motion.div)`
  margin: 0;
  padding: 0;
`;

export const Box = ({ children }: BoxProps) => {
  return <BoxInner>{children}</BoxInner>;
};
