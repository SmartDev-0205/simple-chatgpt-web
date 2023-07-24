import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";
interface IMessage {
  username: string;
  content: string;
}

export default function Dashboard() {
  const inputRef: React.MutableRefObject<any> = useRef(null);
  const messagesEndRef: React.MutableRefObject<any> = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [messages, setMessages] = useState<Array<IMessage>>([]);

  const scrollToBottom = () => {
    console.log("bottom");
    messagesEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  }, [messagesEndRef, messages]);

  //   useEffect(() => {
  //     //create fake messages:
  //     const createFakeMessage = () => {
  //       let tempmessages = [];
  //       for (let i = 0; i < 10; i++) {
  //         let userMessage: IMessage = {
  //           username: "user",
  //           content: "Hello how are you",
  //         };
  //         let botMessage: IMessage = {
  //           username: "bot",
  //           content: "Hello how are you how can I help you?",
  //         };
  //         tempmessages.push(userMessage);
  //         tempmessages.push(botMessage);
  //       }
  //       setMessages(tempmessages);
  //     };
  //     createFakeMessage();
  //   }, []);
  const handleKeyUp = async (e: any) => {
    if (e.keyCode === 13) {
      if (!isLoading) {
        setIsLoading(true);
        await sendChatting();
      }
    }
  };

  const sendChatting = async () => {
    if (!msg) return;
    let tempMessages: Array<IMessage> = [...messages];
    console.log(tempMessages);
    const message: IMessage = {
      username: "user",
      content: msg,
    };
    tempMessages.push(message);
    setMessages(tempMessages);
    setMsg("");
    const loadingMessage: IMessage = {
      content: "Loading...",
      username: "bot",
    };
    tempMessages.push(loadingMessage);
    setMessages(tempMessages);
    console.log(`${process.env.REACT_APP_SERVER}/chat`);
    const response = await axios.post(`${process.env.REACT_APP_SERVER}/chat`, {
      message: msg,
    });
    let reply = response.data["reply"];
    console.log(reply);
    setMsg("");
    const botMessage: IMessage = {
      content: reply,
      username: "bot",
    };
    tempMessages.pop();
    tempMessages.push(botMessage);
    console.log(messages);
    setMessages(tempMessages);
    setIsLoading(false);
  };

  return (
    <div className="container flex-1 flex flex-col">
      <div className="overflow-y-auto flex flex-col gap-3 p-[10px] myoverflow">
        {messages.map((message) => (
          <div
            className={`flex ${
              message.username === "bot" ? "" : "flex-row-reverse"
            }`}
          >
            <div
              className={`p-3 whitespace-pre-line rounded-md min-w-[20px] ${
                message.username === "bot"
                  ? "text-white bg-[#28282C]"
                  : "bg-[#A1DC95] text-black flex-row-reverse"
              }`}
            >
              {parse(message.content)}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="w-full flex flex-row px-[10px] py-[30px]">
        <input
          ref={inputRef}
          placeholder="Write a message..."
          value={msg}
          onKeyUp={(e: any) => handleKeyUp(e)}
          onChange={(e: any) => setMsg(e.target.value)}
          className="flex-1 bg-[#28282C] text-white p-2 "
        />
        <button
          className=""
          onClick={() => {
            sendChatting();
            setMsg("");
          }}
        >
          <img
            alt="send"
            src="/assets/images/send.png"
            width={20}
            height={20}
            style={{ marginLeft: "5px" }}
          ></img>
        </button>
      </div>
    </div>
  );
}
