import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { HiUserAdd } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { FcPlus } from "react-icons/fc";
import { FaTelegramPlane } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";
import { MdSettings, MdArrowBackIos } from "react-icons/md";
import { v4 as uuidv4 } from "uuid";
import React from "react";
import { useRouter } from "next/router";
import chatBoxes from "../models/chatBoxSchema";

const ChatsPage = ({ chatBoxes }) => {
  const session = useSession();
  const friendSearchInputRef = useRef();
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const [chatDetail, setChatDetail] = useState(false);
  const [friendSearch, setFriendSearch] = useState(false);
  const [fetchedSearch, setFethedSearch] = useState(false);
  const [fetchedSearchData, setFethedSearchData] = useState([]);
  const [createChatBoxLoading, setCreateChatBoxLoading] = useState(false);
  const [windowInnerHeight, setWindowInnerHeight] = useState();
  const [messageInput, setMessageInput] = useState("");
  const [messageSending, setMessageSending] = useState(false);
  const messagesEndRef = useRef(null);
  const [checkerVal, setCheckerVal] = useState(false);
  const router = useRouter();
  const refreshData = () => router.replace(router.asPath);
  const [burgerOpen, setBurgerOpen] = useState(false);
  const scrollToBottom = () => {
    if (checkerVal === false) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
    } else {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [chatDetail]);

  const sendHandler = async (id) => {
    if (messageInput.length === 0) {
      return;
    }
    setMessageSending(true);
    const Now = new Date();
    const res = await fetch("/api/send-message", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        message: {
          id: uuidv4(),
          body: messageInput,
          author: session.data.user.email,
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
        id: id,
        message: {
          body: messageInput,
          author: session.data.user.name,
        },
      }),
      headers: { "Content-Type": "application/json" },
    });
    const data2 = await res2.json();

    router.replace(router.asPath);
    setCheckerVal(true);
    setChatDetail(data2.newData);
    setMessageInput("");
    setMessageSending(false);
  };

  useEffect(() => {
    setWindowInnerHeight(window.innerHeight);
  }, [chatDetail]);

  return (
    <>
      <div
        className={`flex items-center h-screen  w-full  `}
        style={{ maxHeight: windowInnerHeight }}
      >
        <div
          className={`container flex max-md:h-full  h-[570px]  md:min-h-[700px] overflow-hidden rounded-xl shadow-xl shadow-black/50   mx-auto my-auto`}
        >
          <div className="left-side h-full  flex flex-col  ">
            <div className="flex items-center justify-between border-b py-2 px-3">
              <Image
                src={session.data.user.image}
                width={500}
                height={500}
                className="w-14 h-14 rounded-full "
                alt="profile picture"
              />
              <span className="capitalize text-xl font-semibold text-neutral-700">
                {session.data.user.name}
              </span>

              <HiUserAdd
                onClick={() => {
                  setFriendSearch(!friendSearch);
                }}
                className="w-7 h-7 text-neutral-700 cursor-pointer "
              />
              <div onClick={() => {}} className="relative group cursor-pointer">
                <div
                  onClick={() => {
                    setSettingsDropdown(!settingsDropdown);
                    setBurgerOpen(!burgerOpen);
                    setBurgerOpen(!burgerOpen);
                  }}
                  className=" hamburger-menu flex flex-col gap-1 "
                >
                  <div
                    className={` h-[3px] w-6 rounded-full transition-all bg-neutral-700  ${
                      burgerOpen ? "burger-open-1 bg-red-600" : ""
                    }`}
                  ></div>
                  <div
                    className={` h-[3px] w-6 rounded-full transition-all bg-neutral-700 ${
                      burgerOpen ? "opacity-0" : ""
                    }`}
                  ></div>
                  <div
                    className={` h-[3px] w-6 rounded-full transition-all bg-neutral-700 ${
                      burgerOpen ? "burger-open-2 bg-red-600" : ""
                    }`}
                  ></div>

                  <ul
                    className={`select-none flex-col gap-1 place-items-center  border bg-green-400 text-white rounded-md right-0 top-6 z-50 ${
                      settingsDropdown ? "absolute" : "hidden"
                    }`}
                  >
                    <li className="border-b px-4 py-1">Profile</li>
                    <li
                      onClick={() => {
                        signOut();
                      }}
                      className="px-3 py-1"
                    >
                      Logout
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="flex flex-col py-1 gap-3 ">
              <div className={` relative  ${friendSearch ? "flex" : "hidden"}`}>
                <input
                  ref={friendSearchInputRef}
                  onChange={async (e) => {
                    if (friendSearchInputRef.current.value.length >= 2) {
                      setFethedSearch(true);
                      const res = await fetch("/api/get-user", {
                        method: "POST",
                        body: JSON.stringify({
                          searchInput:
                            friendSearchInputRef.current.value.toLowerCase(),
                        }),
                        headers: { "Content-Type": "application/json" },
                      });

                      const data = await res.json();

                      const NewData = data.user.filter(
                        (item) => item.email !== session.data.user.email
                      );
                      const checkData = [];

                      chatBoxes.map((chat) => {
                        checkData.push(chat.owner.email);
                        checkData.push(chat.talkingTo.email);
                      });

                      const FinalCheckData = checkData.filter(
                        (item) => item !== session.data.user.email
                      );

                      const FinalData = [];

                      NewData.map(
                        (item) =>
                          !FinalCheckData.includes(item.email) &&
                          FinalData.push(item)
                      );

                      setFethedSearchData(FinalData);
                    } else {
                      setFethedSearch(false);
                    }
                  }}
                  type="text"
                  placeholder="Search a friend"
                  className="px-7 rounded-md h-10 bg-transparent border border-orange-500 outline-orange-500 grow mx-2"
                />
                <BiSearchAlt className="absolute h-6 w-6 left-3 top-2"></BiSearchAlt>
                <div
                  className={`${
                    fetchedSearch ? "flex flex-col gap-2" : "hidden"
                  } w-full  absolute h-fit bg-white rounded-md shadow-lg top-10 `}
                >
                  <span
                    onClick={() => {
                      setFriendSearch(false);
                    }}
                    className="absolute right-2 top-1 font-bold text-xl text-rose-600 cursor-pointer"
                  >
                    x
                  </span>
                  {fetchedSearchData && fetchedSearchData.length === 0 ? (
                    <div className="p-2 border-b text-lg font-semibold">
                      No user found..
                    </div>
                  ) : (
                    fetchedSearchData.map((user) => (
                      <div
                        className="flex items-center p-2 border-b"
                        key={fetchedSearchData.indexOf(user)}
                      >
                        <Image
                          src={user.image}
                          width={500}
                          height={500}
                          className="w-10 h-10 rounded-full "
                          alt="Profile picture of chat user"
                        />
                        <span className="p-2  text-lg font-semibold capitalize">
                          {user.name}
                        </span>
                        <FcPlus
                          onClick={async () => {
                            setCreateChatBoxLoading(true);
                            const res = await fetch("/api/create-chatbox", {
                              method: "POST",
                              body: JSON.stringify({
                                owner: session.data.user,
                                talkingTo: user,
                                messages: [],
                                lastMessage: {},
                              }),
                              headers: { "Content-Type": "application/json" },
                            });
                            setCreateChatBoxLoading(false);
                            setFriendSearch(false);
                            refreshData();
                          }}
                          className={`w-5 h-5 cursor-pointer ${
                            createChatBoxLoading ? "animate-spin" : ""
                          } `}
                        ></FcPlus>
                      </div>
                    ))
                  )}
                </div>
              </div>
              {chatBoxes.map((chat) =>
                chat.owner.email === session.data.user.email ||
                chat.talkingTo.email === session.data.user.email ? (
                  <div
                    key={chatBoxes.indexOf(chat)}
                    onClick={() => {
                      setChatDetail(chat);
                      setCheckerVal(false);
                    }}
                    className="select-none flex items-center gap-5 px-3 p-1  hover:bg-indigo-300 cursor-pointer group "
                  >
                    <Image
                      src={
                        chat.talkingTo.email === session.data.user.email
                          ? chat.owner.image
                          : chat.talkingTo.image
                      }
                      width={500}
                      height={500}
                      className="w-10 h-10 rounded-full "
                      alt="Profile picture of chat user"
                    />
                    <div className="flex flex-col border-b w-full group-hover:border-indigo-300">
                      <span className="text-xl font-semibold text-neutral-600">
                        {chat.talkingTo.name === session.data.user.name
                          ? chat.owner.name
                          : chat.talkingTo.name}
                      </span>
                      <span className="text-lg text-neutral-600 overflow-hidden">
                        {chat.lastMessage &&
                          chat.lastMessage.author + ":" + chat.lastMessage.body}
                      </span>
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
          <div
            className={`w-full bg-indigo-500 relative  max-md:absolute max-md:w-full max-md:h-full hidden  ${
              chatDetail ? "max-md:flex" : "md:flex"
            } md:flex`}
          >
            {chatDetail ? (
              <>
                <div className="flex flex-col w-full ">
                  <div className="flex items-center gap-5 px-5 h-20 shadow-lg py-2 bg-gradient-to-tr  from-indigo-500 to-green-400">
                    <MdArrowBackIos
                      onClick={() => {
                        setChatDetail(null);
                        setCheckerVal(false);
                      }}
                      className="w-7 h-7 cursor-pointer"
                    />
                    <Image
                      src={
                        chatDetail.talkingTo.email === session.data.user.email
                          ? chatDetail.owner.image
                          : chatDetail.talkingTo.image
                      }
                      width={500}
                      height={500}
                      className="rounded-full h-12 w-12"
                      alt="profile picture"
                    />
                    <span className="capitalize text-lg font-semibold text-neutral-800 ">
                      {chatDetail.talkingTo.email === session.data.user.email
                        ? chatDetail.owner.name
                        : chatDetail.talkingTo.name}
                    </span>
                  </div>
                  {/* <ChatLog
                    update={refreshData}
                    chatDetail={chatDetail}
                    session={session}
                  ></ChatLog> */}

                  <div className="flex flex-col  max-md:h-[540px] h-[570px] overflow-y-scroll gap-2  pt-2 px-5  ">
                    {chatDetail.messages.map((message) => (
                      <div
                        key={chatDetail.messages.indexOf(message)}
                        className={`flex  ${
                          message.author === session.data.user.email
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`bg-white min-w-[70px]   px-2  py-2 pb-4 text-lg relative flex rounded-xl ${
                            message.author === session.data.user.email
                              ? "rounded-br-none"
                              : "rounded-bl-none"
                          } `}
                        >
                          <div className="flex-col max-md:max-w-[170px] max-w-[370px] ">
                            {message.image ? (
                              <div className="w-full">
                                <Image
                                  alt="picture"
                                  width={1000}
                                  height={1000}
                                  src={message.image}
                                  className="rounded-lg"
                                />
                              </div>
                            ) : (
                              ""
                            )}
                            <span
                              style={{ wordWrap: "break-word" }}
                              className={`z-10 text-md  ${
                                message.author === session.data.user.email
                                  ? "self-start"
                                  : "self-start"
                              }`}
                            >
                              {message.body}
                            </span>
                          </div>
                          <span
                            className={`text-xs text-gray-400 absolute right-2 bottom-0 ${
                              message.author === session.data.user.email
                                ? "self-end"
                                : "self-start"
                            }`}
                          >
                            {message.date
                              .split("T")[1]
                              .split(".")[0]
                              .split(":")[0] +
                              ":" +
                              message.date
                                .split("T")[1]
                                .split(".")[0]
                                .split(":")[1]}
                          </span>
                          {/* <div
                            className={`absolute bg-white h-5 w-5  bottom-0 z-0 ${
                              message.author === session.data.user.email
                                ? "right-0"
                                : "left-0"
                            } `}
                          ></div> */}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      sendHandler(chatDetail._id);
                    }}
                    className=" flex absolute w-full  h-12 bottom-0"
                  >
                    <input
                      onChange={(e) => {
                        setMessageInput(e.target.value);
                      }}
                      value={messageInput}
                      type="text"
                      className="border w-full h-full outline-indigo-400 text-neutral-800 font-semibold px-2"
                      placeholder="Type something..."
                    />
                    {messageInput.length !== 0 && (
                      <button className="bg-green-500 px-5 font-semibold disabled:cursor-not-allowed disabled:bg-green-800 ">
                        <FaTelegramPlane
                          className={`w-7 h-7 text-white plane ${
                            messageSending ? "sending" : ""
                          }`}
                        />
                      </button>
                    )}
                  </form>
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

  const res = await fetch(`https://sochat-one.vercel.app/api/get-chatboxes`, {
    method: "POST",
    body: JSON.stringify({
      email: session.user.email,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();

  chatBoxes.watch().close();
  return {
    props: {
      session,
      chatBoxes: data.data.reverse(),
    },
  };
}
