import React from "react";

interface Props {
  message: string;
  author: string;
  datetime: string;
}

const MessageItem: React.FC<Props> = ({ author, datetime, message }) => {
  return (
    <div className="card mt-1">
      <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          <span>{author}</span>{" "}
          <small className="text-muted">
            ({new Date(datetime).toLocaleString()})
          </small>
        </h5>
        <p className="card-text">{message}</p>
      </div>
    </div>
  );
};

export default MessageItem;
