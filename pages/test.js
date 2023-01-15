import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const Test = () => {
  const { data: session } = useSession();
  const [messageInput, setMessageInput] = useState("");
  const [messages, setMessages] = useState([]);
    const [counter, setCounter] = useState(0);

    console.log(messages)

  useEffect(() => {
 

    
      const pusher = new Pusher("95bf0f982a46bd0e9a56", {
        cluster: "eu",
      });
      
      const channel = pusher.subscribe("chat");
      channel.bind("chat-update", function (data) {
        const { message } = data;
        setMessages((prev) => [...prev, { message }]);
      });
   


    
  }, []);

  const submitHandler = async () => {
    let Now = new Date()
    const res3 = await fetch("api/pusher", {
      method: "POST",
      body: JSON.stringify({
        message: {
            id: uuidv4(),
            body: messageInput,
            author: session.user.name,
            image: "",
            date: Now,
          },
      }),
      headers: { "Content-Type": "application/json" },
    });
  };

  return (
    <div className="container flex h-screen items-center mx-auto justify-center">
      <div className="flex flex-col">
        <div className="flex flex-col text-white  items-center">
          {messages.map((message) => {
            return (
              <div key={messages.indexOf(message)}>
                {message.message.body}:{message.message.author}
              </div>
            );
          })}
        </div>
        <form className="flex">
          <input
            onChange={(e) => {
              setMessageInput(e.target.value);
            }}
            placeholder="Type a message"
            type="text"
          />
          <button
            onClick={(e) => {
                e.preventDefault()
              submitHandler();
            }}
            className="bg-green-500 p-2"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Test;
