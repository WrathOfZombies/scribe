import styled from "@emotion/styled";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface TextProps {
  children: ReactNode;
}

const P = styled(motion.h1)`
  margin: 0;
  padding: 0;
`;

const Card = ({ children }: TextProps) => {
  return <P>{children}</P>;
};

export default Card;
