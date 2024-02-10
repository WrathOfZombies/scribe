import { MemoryStorage } from "botbuilder";

interface FlowNode {
  id: string;
  type: string;
  message: string;
  previous: string[];
  next: string;
}

class Flow {
  storage: MemoryStorage;
  current: FlowNode | undefined;

  constructor() {
    this.storage = new MemoryStorage();
    this.current = undefined;
  }

  async save(value: FlowNode[]) {
    console.log("Flow.save", value);
    for (const node of value) {
      await this.storage.write({ key: node.id, value: node });
    }
  }

  async read(key: string) {
    return await this.storage.read([key]);
  }

  async restart() {
    this.current = undefined;
    return this.current;
  }

  async start() {
    if (this.current === undefined) {
      const value = await this.storage.read(["start"]);
      this.current = value.start;
    }
    return this.current;
  }

  async next() {
    if (this.current !== undefined) {
      const value = await this.storage.read([this.current.next]);
      this.current = value[this.current.next];
      return this.current;
    } else {
      return this.start();
    }
  }
}

export { Flow, type FlowNode };
