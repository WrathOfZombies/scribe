"use client";

import styled from "@emotion/styled";

import Editor from "@bots/editor";
import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const Main = styled.main`
  padding: 1rem;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--background);
`;

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function Page(): JSX.Element {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Main>
        <Editor />
      </Main>
    </MantineProvider>
  );
}
