import MessageItem from "./MessageItem.tsx";
import { Message } from "../../types";
import React from "react";

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="mt-5">
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
    </div>
  );
};

export default MessageList;
