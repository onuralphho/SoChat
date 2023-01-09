import { useSession } from "next-auth/react";
import LoginScreen from "../components/LoginScreen";
import  { useRouter } from "next/router";
import { useEffect } from "react";

export default function Home() {
 const session = useSession()
  const router = useRouter()

 
  useEffect(() => {
    
    if(session.data){
      router.replace('/chats')
    }
  },[session,router])


  return (
    <>
      <div className="background">
        <div>
          <div className="wave"></div>
          <div className="wave"></div>
          <div className="wave"></div>
        </div>
        <LoginScreen/>
      </div>
    </>
  );
}
