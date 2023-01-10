import React, { useRef } from "react";

const ChatLog = (props) => {
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [, updateState] = React.useState();
  const sendMessageRef = useRef();
  console.log(props)
  const sendHandler = () => {
   
    forceUpdate();
  };
  return (
    <>
      <div className="flex flex-col  max-md:h-[540px] h-[570px] overflow-y-scroll gap-2  mb-10 px-5 pt-5  ">
        {props.chatDetail.messages.map((message) => (
          
          <div
            key={props.chatDetail.messages.indexOf(message)}
            
            className={`flex  ${
              message.author === props.session.data.user.name
                ? "justify-end"
                : "justify-start"
            }`}
          >
            
            <span className="bg-white min-w-[50px] h-[44px] px-4 py-2 text-lg relative flex justify-center rounded-full">
              <span className="z-10">{message.body}</span>
              <div
                className={`absolute bg-white h-5 w-5  bottom-0 z-0 ${
                  message.author === props.session.data.user.name
                    ? "right-0"
                    : "left-0"
                } `}
              ></div>
            </span>
          </div>
        ))}
      </div>
      <div className="absolute flex w-full bg-white h-12 bottom-0">
        <input
          ref={sendMessageRef}
          type="text"
          className="border w-full h-full outline-indigo-400 text-neutral-800 font-semibold px-2"
          placeholder="Type something..."
        />
        <button
          onClick={sendHandler}
          className="bg-green-500 px-5 font-semibold "
        >
          Send
        </button>
      </div>
    </>
  );
};

export default ChatLog;
