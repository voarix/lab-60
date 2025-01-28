import React, { useState } from "react";
import { MessageMutation } from "../types";

interface Props {
  onSubmitAddToMessages: (message: MessageMutation) => void;
}

const MessageForm: React.FC<Props> = ({ onSubmitAddToMessages }) => {
  const initialMessageForm = {
    message: "",
  };

  const [form, setForm] = useState(initialMessageForm);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.message.trim() !== "") {
      const newMessMutation = {
        message: form.message,
        author: "Магистр Йода",
      };
      onSubmitAddToMessages(newMessMutation);
      setForm(initialMessageForm);
    } else {
      alert("Заполните поле");
    }
  };

  const onChangeInputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            value={form.message}
            onChange={onChangeInputMessage}
            name="message"
            className="form-control"
            placeholder="Your message"
            aria-label="Your message"
          />
          <button className="btn btn-outline-secondary" type="submit">
            Send
          </button>
        </div>
      </form>
    </>
  );
};

export default MessageForm;
