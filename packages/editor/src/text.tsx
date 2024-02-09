import { useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";

const handleStyle = { left: 10 };

export type TextNodeProps = {
  value?: string;
  label?: string;
};

export const TextNode = ({ data, isConnectable }: NodeProps<TextNodeProps>) => {
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (evt) => {
      console.log(evt.target.value);
    },
    []
  );

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
      />
      <div>
        <label htmlFor="text">{data.label}</label>
        <input id="text" name="text" onChange={onChange} className="nodrag" />
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
      />
    </div>
  );
};
