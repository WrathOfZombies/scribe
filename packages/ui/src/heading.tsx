"use client";
import styled from "@emotion/styled/macro";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface HeadingProps {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

const headingStyles = ({ level = 1 }: HeadingProps) => `
  font-size: ${24 - level * 2}px;
  font-weight: 700;
  margin: 0;
  margin-bottom: 0.5em;
`;

const H1 = styled(motion.h1)`
  ${headingStyles}
`;
const H2 = styled(motion.h2)`
  ${headingStyles}
`;
const H3 = styled(motion.h3)`
  ${headingStyles}
`;
const H4 = styled(motion.h4)`
  ${headingStyles}
`;
const H5 = styled(motion.h5)`
  ${headingStyles}
`;
const H6 = styled(motion.h6)`
  ${headingStyles}
`;

export const Heading = ({ children, level }: HeadingProps) => {
  switch (level) {
    case 2:
      return <H2>{children}</H2>;

    case 3:
      return <H3>{children}</H3>;

    case 4:
      return <H4>{children}</H4>;

    case 5:
      return <H5>{children}</H5>;

    case 6:
      return <H6>{children}</H6>;

    case 1:
    default:
      return <H1>{children}</H1>;
  }
};
