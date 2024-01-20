"use client";

import styled from "@emotion/styled";
import { motion } from "framer-motion";

const Box = styled(motion.div)`
  width: 200px;
  height: 200px;
  background: var(--accent);
`;

export function Hello() {
  return (
    <Box
      animate={{
        scale: [1, 2, 2, 1, 1],
        rotate: [0, 0, 180, 180, 0],
        borderRadius: ["0%", "0%", "50%", "50%", "0%"],
      }}
      transition={{
        duration: 2,
        ease: "easeInOut",
        times: [0, 0.2, 0.5, 0.8, 1],
        repeat: Infinity,
        repeatDelay: 1,
      }}
    />
  );
}
