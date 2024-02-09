import EchoCard from "@bots/skills-echo/card";
import EchoNode from "@bots/skills-echo/node";
import { useState } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  Panel,
} from "reactflow";
import { shallow } from "zustand/shallow";

import "reactflow/dist/style.css";

import useStore, { RFState } from "./state";

const selector = (state: RFState) => ({
  nodes: state.nodes,
  edges: state.edges,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
});

const Editor = () => {
  const [variant, setVariant] = useState(BackgroundVariant.Cross);
  const { nodes, edges, onNodesChange, onEdgesChange, onConnect } = useStore(
    selector,
    shallow
  );

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <EchoCard>Hello</EchoCard>
      <EchoNode />
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#ccc" variant={variant} />
        <Panel position="top-left">
          <div>variant:</div>
          <button onClick={() => setVariant(BackgroundVariant.Dots)}>
            dots
          </button>
          <button onClick={() => setVariant(BackgroundVariant.Lines)}>
            lines
          </button>
          <button onClick={() => setVariant(BackgroundVariant.Cross)}>
            cross
          </button>
        </Panel>
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default Editor;
