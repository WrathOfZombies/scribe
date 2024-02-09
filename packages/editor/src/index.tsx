import ReactFlow, { Background, BackgroundVariant, Controls } from "reactflow";
import { shallow } from "zustand/shallow";

import "reactflow/dist/style.css";

import { ControlPanel } from "./components/ControlPanel";
import useStore from "./store";
import { Store } from "./types";

const selector = (store: Store) => ({
  nodes: store.nodes,
  edges: store.edges,
  onNodesChange: store.onNodesChange,
  onEdgesChange: store.onEdgesChange,
  onConnect: store.onConnect,
  nodeTypes: store.nodeTypes,
});

const Editor = () => {
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect, nodeTypes } =
    useStore(selector, shallow);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background color="#ccc" variant={BackgroundVariant.Cross} />
        <ControlPanel />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Editor;
