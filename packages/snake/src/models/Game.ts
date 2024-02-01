import { useEffect, useMemo, useState } from "react";
import { Board } from "./Board";
import { Position } from "./Position";

class Food {
  position: Position;

  static spawn() {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return new Food(x, y);
  }

  constructor(x: number, y: number) {
    this.position = new Position(x, y);
  }
}

class Snake {
  position: Position;

  static spawn() {
    const x = Math.floor(Math.random() * 20);
    const y = Math.floor(Math.random() * 20);
    return new Food(x, y);
  }

  constructor(x: number, y: number) {
    this.position = new Position(x, y);
  }
}

export class Game {
  static create(board: Board) {
    return useMemo(() => {
      const game = new Game(board);
      game.newGame();
      return game;
    }, []);
  }

  snake: Snake;
  food: Food;
  frame: number;
  board: Board;
  state: "playing" | "gameover";

  constructor(board: Board) {
    this.board = board;
    this.snake = Snake.spawn();
    this.food = Food.spawn();
    this.frame = 0;
    this.state = "gameover";
  }

  newGame() {
    this.frame = 0;
    this.board.clear();
    this.snake = Snake.spawn();
    this.food = Food.spawn();
    this.state = "playing";
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
        setTick((tick) => tick + 1);
      }, timer);
      return () => clearInterval(interval);
    }, [timer]);

    return tick;
  }
}
