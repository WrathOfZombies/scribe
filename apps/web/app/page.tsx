"use client";

import styled from "@emotion/styled";
import Editor from "@scribe/editor/ui";
import { Hello } from "@scribe/ui/hello";

import { createTheme, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";

const Main = styled.main`
  background-color: var(--background);
  padding: 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const theme = createTheme({
  /** Put your mantine theme override here */
});

export default function Page(): JSX.Element {
  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <Main>
        <Hello />
        <Editor />
      </Main>
    </MantineProvider>
  );
}
