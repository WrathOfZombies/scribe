import { rem } from "@mantine/core";
import { IconBrandMantine } from "@tabler/icons-react";
import { useCallback } from "react";
import { Handle, NodeProps, Position } from "reactflow";
import { Step } from "./step";

const handleStyle = { left: 10 };

export type TextNodeProps = {
  value?: string;
  label?: string;
};

export const TextNode = (props: NodeProps<TextNodeProps>) => {
  const onChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (evt) => {
      console.log(evt.target.value);
    },
    []
  );

  return (
    <Step<TextNodeProps>
      icon={
        <IconBrandMantine
          style={{ width: rem(24), height: rem(24) }}
          stroke={1.5}
          color="var(--mantine-color-blue-filled)"
        />
      }
      label="WhatsApp"
      title="Send message"
      {...props}
    >
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={props.isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        style={handleStyle}
        isConnectable={props.isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={props.isConnectable}
      />
    </Step>
  );
};
