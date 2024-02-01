import { KeyboardEvent, useEffect, useState } from "react";
import { Board } from "./Board";
import { Position } from "./Position";

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
  position: Position;
  nextDirection: "up" | "down" | "left" | "right";

  static spawn(position: Position) {
    return new Snake(position);
  }

  constructor(position: Position) {
    this.position = position;
    this.nextDirection = "right";
    this.listenToKeydown();
  }

  move() {
    switch (this.nextDirection) {
      case "up":
        this.position.up();
        break;
      case "down":
        this.position.down();
        break;
      case "left":
        this.position.left();
        break;
      case "right":
        this.position.right();
        break;
    }
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
    this.snake = Snake.spawn(board.newPosition().random());
    this.food = Food.spawn(board.newPosition().random());
    this.frame = 0;
    this.state = "gameover";
    this.score = 0;
  }

  newGame() {
    this.frame = 0;
    this.board.clear();
    this.snake = Snake.spawn(this.board.newPosition().random());
    this.state = "playing";
    this.spawnFood();
  }

  stopGame() {
    this.state = "gameover";
  }

  get didSnakeEatFood() {
    return this.snake.position.is(this.food.position);
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
        this.board.updateSnake(this.snake.position);

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
