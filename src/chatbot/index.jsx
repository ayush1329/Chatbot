import React, { useState, useEffect } from "react";

import BotMessage from "../components/BotMessage";
import UserMessage from "../components/UserMessage";
import Messages from "../components/Messages";
import Input from "../components/Input";

import Header from "../components/Header";
import chatService from "../api/chatService";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    <BotMessage
      key="0"
      fetchMessage={async () => await chatService.getChatbotResponse("hi")}
    />,
  ]);

  useEffect(() => {
    async function loadWelcomeMessage() {
      const secondMsg = messages.concat(
        <BotMessage
          key={messages.length + 1}
          fetchMessage={async () =>
            await chatService.getChatbotResponse("help")
          }
        />
      );
      setTimeout(() => {
        setMessages(secondMsg);
      }, 3000);
    }
    loadWelcomeMessage();
  }, []);

  const onSend = async (text) => {
    const newMessages = messages.concat(
      <UserMessage key={messages.length + 1} text={text} />,
      <BotMessage
        key={messages.length + 2}
        fetchMessage={async () => await chatService.getChatbotResponse(text)}
      />
    );
    setMessages(newMessages);
  };

  return (
    <div className="chatbot">
      <Header />
      <Messages messages={messages} />
      <Input onSend={onSend} />
    </div>
  );
};

export default Chatbot;
