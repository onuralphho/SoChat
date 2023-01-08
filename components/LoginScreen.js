import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordConfirmInput, setPasswordConfirmInput] = useState("");
  const [isSignIn, setIsSignIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const router = useRouter();

  const checkFormValidityHandler = () => {
    if (
      passwordInput.length === 0 ||
      (!isSignIn && passwordConfirmInput.length === 0) ||
      (!isSignIn && passwordConfirmInput !== passwordInput)
    ) {
      setPasswordValid(false);
    }

    if (!emailInput.includes("@") || emailInput.length === 0) {
      setEmailValid(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (
      emailValid !== false &&
      emailValid !== null &&
      passwordValid !== false &&
      passwordValid !== null
    ) {
      const status = await signIn("credentials", {
        redirect: false,
        email: emailInput,
        password: passwordInput,
        callbackUrl: "/chats",
      });
      if (status.error) {
        setErrorMessage(status.error);
      }
      if (status.ok) {
        router.replace(status.url);
      }
    } else {
    }
  };

  const submitFormHandler = async (e) => {
    e.preventDefault();
    if (emailValid !== false && passwordValid !== false) {
      const nameSplited = emailInput.split("@");
      const lastLogin = new Date();
      console.log(lastLogin)
      const res = await fetch("/api/register", {
        method: "POST",
        body: JSON.stringify({
          email: emailInput,
          password: passwordInput,
          name: nameSplited[0],
          lastLogin: lastLogin,
          image:
            "https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg",
        }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();

      if (data.message) {
        setErrorMessage(data.message);
      } else {
        const status = await signIn("credentials", {
          redirect: false,
          email: emailInput,
          password: passwordInput,
          callbackUrl: "/chats",
        });
        if (status.ok) {
          router.replace(status.url);
        }
      }
    } else {
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <div className="text-5xl p-2 text-white border-2  border-indigo-600 shadow-xl  rounded ">
        Soprah<span className="text-lg text-orange-500">Tech.</span>
      </div>
      <div className="z-10 flex flex-col items-center gap-2 p-3 py-10 max-w-[600px] w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12 shadow-xl bg-white rounded-lg">
        <span className="text-xl text-stone-700 ">
          Welcome to Soprah
          <span className="hand-wave text-2xl">👋</span>
        </span>

        <span className="text-4xl  text-stone-700 mt-3">Join Us!</span>

        <div
          onClick={() => {
            setIsSignIn(!isSignIn);
            setEmailInput("");
            setPasswordInput("");
            setPasswordConfirmInput("");
            setErrorMessage("");
            setPasswordValid(null);
            setEmailValid(null);
          }}
          className="flex relative  gap-2 border-2 border-indigo-600 rounded-md p-1 cursor-pointer"
        >
          <div
            className={`absolute h-12 w-[79px] bg-indigo-600 left-1 transition-all ${
              isSignIn && "translate-x-[92px] w-[69.99px]"
            } rounded-md z-0 `}
          ></div>
          <div
            className={`p-3 rounded-md  z-10 select-none ${
              !isSignIn && "text-white"
            }`}
          >
            Sign Up
          </div>
          <div
            className={`p-3 rounded-md z-10 select-none ${
              isSignIn && "text-white"
            }`}
          >
            Sign In
          </div>
        </div>

        <form
          onSubmit={submitFormHandler}
          className="flex flex-col gap-5 w-full mt-10"
        >
          <label className="flex  relative items-center group ">
            <MdAlternateEmail className="form-icon" />
            <input
              className={`form-input ${
                emailValid === false
                  ? "text-red-500 outline outline-red-500"
                  : ""
              }`}
              type="email"
              value={emailInput}
              onBlur={checkFormValidityHandler}
              placeholder="E-mail"
              onChange={(e) => {
                setEmailInput(e.target.value);
                setEmailValid();
              }}
            />
          </label>
          <label className="flex  relative items-center group ">
            {!showPassword ? (
              <AiOutlineEye
                className="form-icon cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            ) : (
              <AiOutlineEyeInvisible
                className="form-icon cursor-pointer"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              />
            )}

            <input
              className={`form-input ${
                passwordValid === false
                  ? " outline outline-red-500 text-red-500"
                  : ""
              } `}
              type={showPassword ? "text" : "password"}
              onBlur={checkFormValidityHandler}
              placeholder="Password"
              value={passwordInput}
              onChange={(e) => {
                setPasswordInput(e.target.value);
                setPasswordValid(undefined);
              }}
            />
          </label>
          {!isSignIn && (
            <label className="flex  relative items-center group ">
              {!showPassword ? (
                <AiOutlineEye
                  className="form-icon cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              ) : (
                <AiOutlineEyeInvisible
                  className="form-icon cursor-pointer"
                  onClick={() => {
                    setShowPassword(!showPassword);
                  }}
                />
              )}

              <input
                className={`form-input ${
                  passwordValid === false
                    ? "outline outline-red-500 text-red-500"
                    : ""
                } `}
                type={showPassword ? "text" : "password"}
                onBlur={checkFormValidityHandler}
                value={passwordConfirmInput}
                placeholder="Confirm Password"
                onChange={(e) => {
                  setPasswordConfirmInput(e.target.value);
                  setPasswordValid(undefined);
                }}
              />
            </label>
          )}
          <div className="flex justify-center text-red-500">
            {errorMessage ? <span>{errorMessage}</span> : null}
          </div>
          {!isSignIn && (
            <button
              onClick={() => {
                checkFormValidityHandler();
              }}
              type="submit"
              className="form-button"
            >
              Join
            </button>
          )}
          {isSignIn && (
            <button
              type="button"
              onClick={(e) => {
                checkFormValidityHandler();

                handleLogin(e);
              }}
              className="form-button mt-3"
            >
              Login
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
