import {
  Connection,
  Edge,
  EdgeChange,
  Node,
  NodeChange,
  addEdge,
  applyEdgeChanges,
  applyNodeChanges,
} from "reactflow";
import { create } from "zustand";
import { nodeTypes } from "./nodes";
import { Store } from "./types";

const initialNodes: Node[] = [];

const initialEdges: Edge[] = [];

// this is our useStore hook that we can use in our components to get parts of the store and call actions
const useStore = create<Store>((set, get) => ({
  nodes: initialNodes,
  edges: initialEdges,
  nodeTypes: nodeTypes,
  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes),
    });
  },
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges),
    });
  },
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  setNodes: (nodes: Node[]) => {
    set({ nodes });
  },
  setEdges: (edges: Edge[]) => {
    set({ edges });
  },
  onAddNode: (node: Node) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  onChangeNodeType: (id: string, type: string) => {
    const node = get().nodes.find((node) => node.id === id);
    if (node) {
      node.data.messageType = type;
      set({
        nodes: get().nodes,
      });
    }
  },
}));

export default useStore;
