import "./App.css";
import { useEffect, useState } from "react";
import { Message } from "./types";
import MessageList from "./components/MessageList/MessageList.tsx";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const fetchRequest = async (url: string): Promise<Message[]> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response нот ОКЭЙ");
    }

    return await response.json();
  };

  const fetchMessages = async (datetime: string): Promise<Message[]> => {
    let url = "http://146.185.154.90:8000/messages";
    if (datetime) {
      url += `?datetime=${datetime}`;
    }

    try {
      return await fetchRequest(url);
    } catch (error) {
      console.error("Ошибка:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const initialMessages = await fetchMessages("");
      setMessages(initialMessages);
    };

    void fetchInitialMessages();

    const intervalId = setInterval(async () => {
      setMessages((prevState) => {
        if (prevState.length > 0) {
          const lastMess = prevState[prevState.length - 1].datetime;
          fetchMessages(lastMess).then((newMess) => {
            if (newMess.length > 0) {
              setMessages((prev) => [...prev, ...newMess]);
            }
          });
        }
        return prevState;
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  console.log(messages);

  return (
    <div className="container">
      <MessageList messages={messages} />
    </div>
  );
};

export default App;
