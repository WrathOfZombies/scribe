import { Select } from "@mantine/core";
import React from "react";
import { NodeProps } from "reactflow";
import { shallow } from "zustand/shallow";
import { Column } from "../layout/box";
import useStore from "../store";
import { Store } from "../types";
import { MessageWrapper } from "./MessageWrapper";
import { StaticMessage } from "./StaticMessage";

const messageTypes = {
  "Static Message": StaticMessage,
} as const;

type MessageTypes = typeof messageTypes;
type MessageType = keyof MessageTypes;

type MessageProps = {
  messageType: MessageType;
};

const selector = (store: Store) => ({
  onChangeNodeType: store.onChangeNodeType,
  nodeTypes: Object.keys(messageTypes),
});

const Message: React.FC<NodeProps> = (props: NodeProps<MessageProps>) => {
  const { messageType } = props.data;
  const MessageComponent = messageTypes[messageType] ?? StaticMessage;
  const { onChangeNodeType, nodeTypes } = useStore(selector, shallow);

  return (
    <MessageWrapper>
      <Column>
        <Select
          label="Select message type"
          placeholder="Message"
          data={nodeTypes}
          comboboxProps={{ shadow: "md" }}
          onSelect={(event) => {
            if (!("value" in event.target)) {
              return;
            }
            onChangeNodeType(props.id, event.target.value as string);
          }}
        />
        <MessageComponent {...props} data={props.data as never} />
      </Column>
    </MessageWrapper>
  );
};

export { Message };
