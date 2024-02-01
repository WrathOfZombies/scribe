import { range } from "lodash";
import { Position } from "./Position";

class BodyNode {
  position: Position;
  next: BodyNode | null = null;
  prev: BodyNode | null = null;

  constructor(position: Position) {
    this.position = position;
  }

  get isHead() {
    return this.prev === null;
  }

  get isTail() {
    return this.next === null;
  }

  pushFront(position: Position) {
    const node = new BodyNode(position);
    node.next = this;
    this.prev = node;
    return node;
  }

  pushBack(position: Position) {
    const node = new BodyNode(position);
    node.prev = this;
    this.next = node;
    return node;
  }

  popBack() {
    if (this.prev) {
      this.prev.next = null;
      return this.prev;
    }
    return this;
  }
}

export class Body {
  head: BodyNode;
  tail: BodyNode;

  constructor(
    public start: Position,
    length: number
  ) {
    this.head = new BodyNode(start);
    let next = this.head;
    for (const i of range(0, length - 1)) {
      next = next.pushBack(next.position.clone().left());
    }
    this.tail = next;
  }

  [Symbol.iterator]() {
    let node: BodyNode | null = this.head;
    return {
      next() {
        if (node === null) {
          return { done: true, value: null };
        }
        const value = node.position;
        node = node.next;
        return { done: false, value };
      },
    };
  }

  get length() {
    let length = 0;
    for (const _ of this) {
      length++;
    }
    return length;
  }

  grow(position: Position) {
    this.head = this.head.pushFront(position);
  }

  shrink() {
    this.tail = this.tail.popBack();
  }
}
