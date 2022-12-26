import { useSession, getSession } from "next-auth/react";
import { useEffect } from "react";

const chats = () => {
  const session = useSession();

  if (session.status === "loading") {
    return null;
  }

  return (<><img src={session.data.user.image}/><div>Welcome {session.data.user.name}</div></>);
};

export default chats;

// export const getServerSideProps = async (context) => {

//     const session = await getSession({ req: context.req });

//     const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get-user`, {
//       method: "POST",
//       body: JSON.stringify({ email: session.user.email }),
//       headers: { "Content-Type": "application/json" },
//     });
//     const userData = await res.json();
//     return {
//       props: {

//         userData,

//       },
//     };
//   };
