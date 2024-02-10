import styled from "@emotion/styled";
import { rem } from "@mantine/core";
import { motion } from "framer-motion";

const MessageWrapper = styled(motion.section)`
  margin: 0;
  padding: ${rem(16)};
  border-radius: ${rem(8)};
  background: var(--background);
  box-shadow: 0px 0px 10px 0px var(--mantine-color-gray-4);
`;

export { MessageWrapper };
