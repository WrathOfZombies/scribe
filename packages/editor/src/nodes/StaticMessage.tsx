import { Text, rem } from "@mantine/core";
import { NodeProps } from "reactflow";
import { Column } from "../layout/box";

export type StaticMessageProps = NodeProps<{
  message?: string;
}>;

export const StaticMessage: React.FC<StaticMessageProps> = (props) => {
  const { data } = props;
  const { message } = data;

  return (
    <Column width={400} margin={`${rem(10)} 0`}>
      <Text size="sm">
        Welcome to the 'Welcome User' Bot. This bot will introduce you to
        welcoming and greeting users.
      </Text>
    </Column>
  );
};
