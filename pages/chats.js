import { useSession } from "next-auth/react";
import Image from "next/image";
import { MdSettings } from "react-icons/md";
const ChatsPage = () => {
  const session = useSession();
  if (session.status === "loading") {
    return null;
  }

  const DUMMY_CHATS = [
    {
      name: "john doe",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
      lastMessage: "Hello, Onuralp!",
    },
    {
      name: "Max Martin",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
      lastMessage: "Hello, Onuralp!",
    },
    {
      name: "Garreld Nick Jr",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
      lastMessage: "Hello, Onuralp!",
    },
    {
      name: "Johnathen",
      image:
        "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
      lastMessage: "Hello, Onuralp!",
    },
  ];

  console.log(session.data.expires);
  return (
    <>
      <div className="flex items-center h-screen w-full ">
        <div className="container flex  h-[700px] overflow-hidden rounded-xl shadow-xl shadow-black/50   mx-auto my-auto">
          <div className="left-side  flex flex-col ">
            <div className="flex items-center justify-between border-b py-2 px-3">
              <Image
                src={session.data.user.image}
                width={50}
                height={50}
                className="rounded-full "
              />
              <span className="capitalize text-xl font-semibold text-neutral-700">
                {session.data.user.name}
              </span>
              <MdSettings className="w-7 h-7 text-neutral-700" />
            </div>
            <div className="flex flex-col py-4 gap-3 ">
              {DUMMY_CHATS.map((chat) => (
                <div className="flex items-center gap-5 px-3  hover:bg-indigo-300 cursor-pointer group ">
                  <Image
                    src={chat.image}
                    width={50}
                    height={50}
                    className="rounded-full "
                  />
                  <div className="flex flex-col border-b w-full group-hover:border-indigo-300">
                    <span className="text-xl font-semibold text-neutral-600">{chat.name}</span>
                    <span className="text-lg text-neutral-600" >
                      {chat.lastMessage}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="right-side"></div>
        </div>
      </div>
    </>
  );
};

export default ChatsPage;
