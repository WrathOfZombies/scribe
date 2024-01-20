"use client";

import styled from "@emotion/styled";
import Editor from "@scribe/editor/ui";
import { Hello } from "@scribe/ui/hello";

const Main = styled.main`
  background-color: var(--background);
  padding: 1rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Page(): JSX.Element {
  return (
    <Main>
      <Hello />
      <Editor />
    </Main>
  );
}
