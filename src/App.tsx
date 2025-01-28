import "./App.css";
import { useEffect, useState } from "react";
import { Message, MessageMutation } from "./types";
import MessageList from "./components/MessageList/MessageList.tsx";
import MessageForm from "./components/MessageForm.tsx";
import Loader from "./UI/Loader.tsx";

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loader, setLoader] = useState<boolean>(true);

  const fetchRequest = async (url: string): Promise<Message[]> => {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Network response нот ОКЭЙ");
    }

    return await response.json();
  };

  useEffect(() => {
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

    const fetchInitialMessages = async () => {
      const initialMessages = await fetchMessages("");
      setMessages(initialMessages);
      setLoader(false);
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

  const sendMessage = async ({ author, message }: MessageMutation) => {
    const body = new URLSearchParams();
    body.append("author", author);
    body.append("message", message);

    try {
      await fetch("http://146.185.154.90:8000/messages", {
        method: "POST",
        body,
      });
    } catch (error) {
      console.error("Ошибка при отправке сообщения:", error);
    }
  };

  return (
    <div className="container mt-4 mb-2">
      <MessageForm onSubmitAddToMessages={sendMessage} />
      {loader ? <Loader /> : <MessageList messages={[...messages].reverse()} />}
    </div>
  );
};

export default App;
