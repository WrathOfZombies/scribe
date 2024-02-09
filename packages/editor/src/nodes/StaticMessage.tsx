import { Text, rem } from "@mantine/core";
import { IconBrandMantine } from "@tabler/icons-react";
import { Handle, NodeProps, Position } from "reactflow";
import { Message } from "./Message";

const handleStyle = { left: 10 };

export type StaticMessageProps = {
  value?: string;
  label?: string;
  content?: string;
};

export const StaticMessage = (props: NodeProps<StaticMessageProps>) => {
  const { data } = props;
  const { value, label, content } = data;

  return (
    <Message<StaticMessageProps>
      icon={
        <IconBrandMantine
          style={{ width: rem(32), height: rem(32) }}
          stroke={1.5}
          color="var(--mantine-color-blue-filled)"
        />
      }
      label={label}
      title={value ?? ""}
      {...props}
    >
      <Text>{content}</Text>
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
    </Message>
  );
};
