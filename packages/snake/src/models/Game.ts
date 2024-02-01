import { KeyboardEvent, useEffect, useState } from "react";
import { Board } from "./Board";
import { Body } from "./Body";
import { Position } from "./Position";

function isNotNull<T>(value: T | null): value is T {
  return value !== null;
}

class Food {
  position: Position;

  static spawn(position: Position) {
    return new Food(position);
  }

  constructor(position: Position) {
    this.position = position;
  }
}

class Snake {
  nextDirection: "up" | "down" | "left" | "right";

  static spawn(position: Position, length: number) {
    return new Snake(position, length);
  }

  body: Body;

  constructor(
    position: Position,
    public length: number
  ) {
    this.nextDirection = "right";
    this.body = new Body(position, length);
    this.listenToKeydown();
  }

  get positions(): Position[] {
    return Array.from(this.body).filter(isNotNull);
  }

  move() {
    const position = this.body.head.position.clone();
    switch (this.nextDirection) {
      case "up":
        position.up();
        break;
      case "down":
        position.down();
        break;
      case "left":
        position.left();
        break;
      case "right":
        position.right();
        break;
    }
    this.body.grow(position);
    this.body.shrink();
  }

  listenToKeydown() {
    const handler: any = (event: KeyboardEvent) => {
      switch (event.key) {
        case "ArrowUp":
          this.nextDirection = "up";
          break;
        case "ArrowDown":
          this.nextDirection = "down";
          break;
        case "ArrowLeft":
          this.nextDirection = "left";
          break;
        case "ArrowRight":
          this.nextDirection = "right";
          break;
      }
    };

    window.addEventListener("keydown", handler, { passive: true });
    return () => window.removeEventListener("keydown", handler);
  }
}

export class Game {
  score: number;

  static create(board: Board) {
    const [game] = useState(() => {
      const game = new Game(board);
      game.newGame();
      return game;
    });
    return game;
  }

  snake: Snake;
  food: Food;
  frame: number;
  board: Board;
  state: "playing" | "gameover";

  constructor(board: Board) {
    this.board = board;
    this.snake = Snake.spawn(board.newPosition().random(), 5);
    this.food = Food.spawn(board.newPosition().random());
    this.frame = 0;
    this.state = "gameover";
    this.score = 0;
  }

  newGame() {
    this.frame = 0;
    this.board.clear();
    this.snake = Snake.spawn(this.board.newPosition().random(), 5);
    this.state = "playing";
    this.spawnFood();
  }

  stopGame() {
    this.state = "gameover";
  }

  get didSnakeEatFood() {
    return this.snake.body.head.position.is(this.food.position);
  }

  spawnFood() {
    this.food = Food.spawn(this.board.newPosition().random());
    if (this.didSnakeEatFood) {
      this.spawnFood();
    }
  }

  useLoop() {
    this.frame++;
    useEffect(() => {
      const work = () => {
        this.frame++;

        if (this.state === "gameover") {
          return;
        }

        this.board.updateFood(this.food.position);
        this.board.updateSnake(this.snake.positions);

        return requestAnimationFrame(work);
      };
      const handle = work();
      return () => {
        handle && cancelAnimationFrame(handle);
      };
    }, []);
  }

  useTicker(fps: number = 60) {
    const timer = 1000 / fps;
    const [tick, setTick] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        this.snake.move();
        if (this.didSnakeEatFood) {
          this.food = Food.spawn(this.board.newPosition().random());
          this.score++;
        }
        setTick((tick) => tick + 1);
      }, timer);
      return () => clearInterval(interval);
    }, [timer]);

    return tick;
  }
}
