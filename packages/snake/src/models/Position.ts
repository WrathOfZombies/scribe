export type Position = {
  x: number;
  y: number;
  right(steps?: number): void;
  left(steps?: number): void;
  up(steps?: number): void;
  down(steps?: number): void;
  is(other: Position): boolean;
};

export const withBounds = (width: number, height: number) => {
  class Position {
    x: number;
    y: number;

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
    }

    left(steps = 1) {
      this.x -= steps;
      this.clamp();
    }

    up(steps = 1) {
      this.y -= steps;
      this.clamp();
    }

    down(steps = 1) {
      this.y += steps;
      this.clamp();
    }

    is(other: Position) {
      return this.x === other.x && this.y === other.y;
    }
  }

  return Position;
};
