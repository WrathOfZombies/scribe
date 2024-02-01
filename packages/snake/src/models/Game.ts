import { useEffect, useState } from "react";
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

  static spawn(position: Position) {
    return new Snake(position);
  }

  constructor(position: Position) {
    this.position = position;
  }

  move() {
    this.position.right();
  }
}

export class Game {
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
  }

  newGame() {
    this.frame = 0;
    this.board.clear();
    this.snake = Snake.spawn(this.board.newPosition().random());
    this.food = Food.spawn(this.board.newPosition().random());
    this.state = "playing";
  }

  stopGame() {
    this.state = "gameover";
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
        setTick((tick) => tick + 1);
      }, timer);
      return () => clearInterval(interval);
    }, [timer]);

    return tick;
  }
}
