import "./App.css";
import { useEffect, useState } from "react";
import { Message } from "./types";
import MessageItem from "./components/MessageItem.tsx";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchRequest = async () => {
    try{
      const response = await fetch("http://146.185.154.90:8000/messages");
      const responseJson = await response.json();
      setMessages(responseJson);
    } catch (error) {
      alert('Ошибка:' + error);
    }
  };

  useEffect(() => {
    void fetchRequest();
  }, []);


  return (
    <div className="container">
      {messages.length > 0 ? (
        messages.map((message) => (
          <MessageItem author={message.author} message={message.message} datetime={message.datetime} key={message._id}/>
        ))
      ) : null}
    </div>
  );
};

export default App;
