export type Position = {
  clone(): Position;
  x: number;
  y: number;
  right(steps?: number): Position;
  left(steps?: number): Position;
  up(steps?: number): Position;
  down(steps?: number): Position;
  is(other: Position): boolean;
};

export const withBounds = (width: number, height: number) => {
  class Position {
    x: number;
    y: number;

    clone() {
      return new Position(this.x, this.y);
    }

    clamp() {
      if (this.x < 0) this.x = width - this.x;
      if (this.x >= width) this.x = this.x - width;
      if (this.y < 0) this.y = height - this.y;
      if (this.y >= height) this.y = this.y - height;
    }

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    static random() {
      const x = Math.floor(Math.random() * width);
      const y = Math.floor(Math.random() * height);
      return new Position(x, y);
    }

    right(steps = 1) {
      this.x += steps;
      this.clamp();
      return this;
    }

    left(steps = 1) {
      this.x -= steps;
      this.clamp();
      return this;
    }

    up(steps = 1) {
      this.y -= steps;
      this.clamp();
      return this;
    }

    down(steps = 1) {
      this.y += steps;
      this.clamp();
      return this;
    }

    is(other: Position) {
      return this.x === other.x && this.y === other.y;
    }
  }

  return Position;
};
