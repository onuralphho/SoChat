import React, { useEffect, useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
const ChatLog = (props) => {
  const router = useRouter()
  const [messageInput, setMessageInput] = useState("");
  const [messageSending, setMessageSending] = useState(false);
  const [, updateState] = React.useState();
  const [reloader, setReloader] = useState(false);

  const sendHandler = async () => {
    setMessageSending(true);
    setReloader(true)
    const Now = new Date();
    const res = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({
        id: props.chatDetail._id,
        message: {
          id: uuidv4(),
          body: messageInput,
          author: props.session.data.user.email,
          image: "",
          date: Now,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();

    const res2 = await fetch("/api/set-lastmessage", {
      method: "POST",
      body: JSON.stringify({
        id: props.chatDetail._id,
        message: {
          body: messageInput,
          author: props.session.data.user.name,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data2 = await res2.json();
    setMessageInput("");
    setMessageSending(false);
    setReloader(false)
  };
  return (
    <>
      <div className="flex flex-col  max-md:h-[540px] h-[570px] overflow-y-scroll gap-2  mb-10 px-5 pt-5  ">
        {props.chatDetail.messages.map((message) => (
          <div
            key={props.chatDetail.messages.indexOf(message)}
            className={`flex  ${
              message.author === props.session.data.user.email
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <span className="bg-white min-w-[50px] h-[44px] px-4 py-2 text-lg relative flex flex-col justify-center rounded-full">
             
              <span className="z-10">{message.body}</span>
              <div
                className={`absolute bg-white h-5 w-5  bottom-0 z-0 ${
                  message.author === props.session.data.user.email
                    ? "right-0"
                    : "left-0"
                } `}
              ></div>
            </span>
          </div>
        ))}
      </div>
      <div className=" flex absolute w-full  h-12 bottom-0">
        <input
          onChange={(e) => {
            setMessageInput(e.target.value);
          }}
          value={messageInput}
          type="text"
          className="border w-full h-full outline-indigo-400 text-neutral-800 font-semibold px-2"
          placeholder="Type something..."
        />
        <button
          onClick={sendHandler}
          disabled={messageInput.length === 0}
          className="bg-green-500 px-5 font-semibold disabled:cursor-not-allowed disabled:bg-green-800 disabled:blur-sm"
        >
          <span className={`${messageSending ? "animate-ping" : ""}`}>
            Send
          </span>
        </button>
      </div>
    </>
  );
};

export default ChatLog;
