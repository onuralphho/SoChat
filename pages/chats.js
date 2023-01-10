import { getSession, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { HiUserAdd } from "react-icons/hi";
import { BiSearchAlt } from "react-icons/bi";
import { FcPlus } from "react-icons/fc";
import { useRef, useState } from "react";
import { MdSettings, MdArrowBackIos } from "react-icons/md";
import ChatLog from "../components/ChatLog";
import React from "react";
import { useRouter } from "next/router";
const ChatsPage = ({ chatBoxes }) => {
  const friendSearchInputRef = useRef();
  const [settingsDropdown, setSettingsDropdown] = useState(false);
  const session = useSession();
  const [chatDetail, setChatDetail] = useState(false);
  const [friendSearch, setFriendSearch] = useState(false);
  const [fetchedSearch, setFethedSearch] = useState(false);
  const [fetchedSearchData, setFethedSearchData] = useState([]);
  const [createChatBoxLoading, setCreateChatBoxLoading] = useState(false);
  const forceUpdate = React.useCallback(() => updateState({}), []);
  const [, updateState] = React.useState();
  const router = useRouter()
  const refreshData = () => router.replace(router.asPath);

  return (
    <>
      <div className="flex items-center h-screen w-full bg-neutral-800 ">
        <div className="container flex max-md:h-screen h-[570px]  md:min-h-[700px] overflow-hidden rounded-xl shadow-xl shadow-black/50   mx-auto my-auto">
          <div className="left-side  flex flex-col ">
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
                  className={` flex-col gap-1 place-items-center  border bg-green-400 text-white rounded-md right-0 z-50 ${
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
                      setFethedSearchData(data.user);
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
                                lastMessage: "",
                              }),
                              headers: { "Content-Type": "application/json" },
                            });
                            setCreateChatBoxLoading(false);
                            setFriendSearch(false);
                            refreshData()
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
                    }}
                    className="flex items-center gap-5 px-3 p-1  hover:bg-indigo-300 cursor-pointer group "
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
                        {chat.lastMessage.body &&
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
                <div className="flex flex-col w-full  ">
                  <div className="flex items-center gap-5 px-5 h-20 shadow-lg py-2 ">
                    <MdArrowBackIos
                      onClick={() => {
                        setChatDetail(null);
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
                    <span className="capitalize text-lg font-semibold text-neutral-800">
                      {chatDetail.talkingTo.email === session.data.user.email
                        ? chatDetail.owner.name
                        : chatDetail.talkingTo.name}
                    </span>
                  </div>
                  <ChatLog chatDetail={chatDetail} session={session}></ChatLog>
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

  return {
    props: {
      session,
      chatBoxes: data.data,
    },
  };
}
