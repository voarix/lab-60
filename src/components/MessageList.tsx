import MessageItem from "./MessageItem.tsx";
import { Message } from "../types";
import React from "react";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <>
      {messages.length > 0
        ? messages.map((message) => (
            <MessageItem
              author={message.author}
              message={message.message}
              datetime={message.datetime}
              key={message._id}
            />
          ))
        : null}
    </>
  );
};

export default MessageList;
