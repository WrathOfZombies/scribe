import styled from "@emotion/styled";
import { Board } from "./models/Board";
import { Game } from "./models/Game";

const Layout = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  ${({ kind }: { kind: "row" | "column" }) =>
    kind === "row"
      ? "flex-direction: row;"
      : kind === "column"
        ? "flex-direction: column;"
        : ""}
`;

const Counter = styled.p`
  font-size: 2rem;
  font-weight: bold;
  color: var(--white);
  align-self: start;
`;

export const Snake = () => {
  const board = Board.create(20, 20);
  const game = Game.create(board);

  game.useLoop();
  const tick = game.useTicker(30);

  return (
    <Layout kind="column">
      <Layout kind="row">
        <Counter>
          Frame: <span>{game.frame}</span>
        </Counter>
        <Counter>
          Tick: <span>{tick}</span>
        </Counter>
      </Layout>
      {board.render()}
    </Layout>
  );
};
