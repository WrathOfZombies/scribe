import { Text } from "@mantine/core";
import { Handle, NodeProps, Position } from "reactflow";
import { Column } from "../layout/box";

export type StaticMessageProps = NodeProps<{
  message?: string;
}>;

export const StaticMessage: React.FC<StaticMessageProps> = (props) => {
  const { data } = props;
  const { message } = data;

  return (
    <Column>
      <Text>{message}</Text>
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={props.isConnectable}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="a"
        isConnectable={props.isConnectable}
      />
    </Column>
  );
};
