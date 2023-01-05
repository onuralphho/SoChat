import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { MdSettings, MdArrowBackIos } from "react-icons/md";
import React from "react";
const ChatsPage = () => {
  const inputRef = useRef();
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const session = useSession();
  const [chatDetail, setChatDetail] = useState(false);
  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [DUMMY_CHATS, setDUMMY_CHATS] = useState([
    {
      id: 4234123,
      name: "john doe",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",

      messages: [
        { body: "test1", author: "onuralphho" },
        { body: "test2", author: "john doe" },
        { body: "test3", author: "onuralphho" },
      ],
      lastMessage: { body: "test3", author: "onuralphho" },
    },
    {
      name: "Max Martin",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
      lastMessage: {},
    },
    {
      name: "Garreld Nick Jr",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
      lastMessage: {},
    },
    {
      name: "Johnathen",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
      lastMessage: {},
    },
  ]);

  const sendHandler = () => {
    DUMMY_CHATS[0].messages.push({
      body: inputRef.current.value,
      author: session.data.user.name,
    });
    DUMMY_CHATS[0].lastMessage = {
      body: inputRef.current.value,
      author: session.data.user.name,
    };
    let test = DUMMY_CHATS;
    setDUMMY_CHATS(test);
    forceUpdate();
  };

  if (session.status === "loading") {
    return null;
  }

  return (
    <>
      <div className="flex items-center h-screen w-full bg-neutral-800 ">
        <div className="container flex max-md:h-screen  md:min-h-[700px] overflow-hidden rounded-xl shadow-xl shadow-black/50   mx-auto my-auto">
          <div className="left-side  flex flex-col ">
            <div className="flex items-center justify-between border-b py-2 px-3">
              <Image
                src={session.data.user.image}
                width={50}
                height={50}
                className="rounded-full "
                alt="profile picture"
              />
              <span className="capitalize text-xl font-semibold text-neutral-700">
                {session.data.user.name}
              </span>
              <div
                onClick={() => {
                  setSettingsDropdown(!settingsDropdown);
                }}
                className="relative group cursor-pointer"
              >
                <MdSettings className="w-7 h-7 text-neutral-700 " />
                <ul
                  onMouseLeave={() => {
                    setSettingsDropdown(false);
                  }}
                  className={` flex-col gap-1 place-items-center  border bg-green-400 text-white rounded-md right-0 ${
                    settingsDropdown ? "absolute" : "hidden"
                  }`}
                >
                  <li className="border-b px-4 py-1">Profile</li>
                  <li
                    onClick={() => {
                      signOut();
                    }}
                    className="border-b px-3 py-1"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex flex-col py-4 gap-3 ">
              {DUMMY_CHATS.map((chat) => (
                <div
                  key={DUMMY_CHATS.indexOf(chat)}
                  onClick={() => {
                    setChatDetail(true);
                  }}
                  className="flex items-center gap-5 px-3 p-1  hover:bg-indigo-300 cursor-pointer group "
                >
                  <Image
                    src={chat.image}
                    width={50}
                    height={50}
                    className="rounded-full "
                    alt="Profile picture of chat user"
                  />
                  <div className="flex flex-col border-b w-full group-hover:border-indigo-300">
                    <span className="text-xl font-semibold text-neutral-600">
                      {chat.name}
                    </span>
                    <span className="text-lg text-neutral-600 overflow-hidden">
                      {chat.lastMessage.body &&
                        chat.lastMessage.author + ":" + chat.lastMessage.body}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`w-full bg-indigo-500 relative py-5  max-md:absolute max-md:w-full max-md:h-full hidden  ${
              chatDetail ? "max-md:flex" : "md:flex"
            } md:flex`}
          >
            {chatDetail ? (
              <>
                <div className="flex flex-col w-full">
                  <div className="flex items-center gap-5 px-5">
                    <MdArrowBackIos
                      onClick={() => {
                        setChatDetail(false);
                      }}
                      className="w-7 h-7 cursor-pointer"
                    />
                    <Image
                      src={DUMMY_CHATS[0].image}
                      width={50}
                      height={50}
                      className="rounded-full "
                      alt="profile picture"
                    />
                    <span className="capitalize text-lg text-neutral-800">
                      {DUMMY_CHATS[0].name}
                    </span>
                  </div>
                  <div className="flex flex-col  h-[570px] overflow-y-scroll gap-2 justify-end mb-10 px-5 pt-5  ">
                    {DUMMY_CHATS[0].messages.map((message) => (
                      <div
                        key={Math.random()}
                        className={`flex   ${
                          message.author === session.data.user.name
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span className="bg-white min-w-[50px] px-4 py-2 text-lg relative flex justify-center rounded-full">
                          <span className="z-10">{message.body}</span>
                          <div
                            className={`absolute bg-white h-5 w-5  bottom-0 z-0 ${
                              message.author === session.data.user.name
                                ? "right-0"
                                : "left-0"
                            } `}
                          ></div>
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="absolute flex w-full bg-white h-12 bottom-0">
                  <input
                    ref={inputRef}
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
            ) : (
              <div className="flex flex-col gap-2 h-full w-full justify-center items-center">
                <span className="text-4xl font-semibold text-neutral-900">
                  Talk with your friends!
                </span>
                <span className="text-xl">as usual...😉</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatsPage;

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        parmanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
