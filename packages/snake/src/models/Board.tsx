import styled from "@emotion/styled";
import { useMemo } from "react";
import { Position, withBounds } from "./Position";

const Cell = styled.div`
  background-color: ${({ color }: { color?: string }) => color || "#fff"};
  border: 1px solid #000;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(20, 30px);
  grid-template-rows: repeat(20, 30px);
  gap: 1px;
  justify-content: center;
`;

export class Board {
  static create(width: number, height: number) {
    return useMemo(() => {
      return new Board(width, height);
    }, [width, height]);
  }

  width: number;
  height: number;
  cells: React.ReactNode[];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: width * height }, (_, i) => (
      <Cell key={i} />
    ));
  }

  newPosition() {
    return withBounds(this.width, this.height);
  }

  render() {
    return <Grid>{this.cells}</Grid>;
  }

  updateSnake(position: Position) {
    const index = position.y * this.width + position.x;
    this.cells[index] = <Cell key={index} color="green" />;
  }

  updateFood(position: Position) {
    const index = position.y * this.width + position.x;
    this.cells[index] = <Cell key={index} color="red" />;
  }

  clear() {
    this.cells = Array.from({ length: this.width * this.height }, (_, i) => (
      <Cell key={i} />
    ));
  }
}
