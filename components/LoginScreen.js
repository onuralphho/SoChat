import { MdAlternateEmail } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailInput, setEmailInput] = useState();
  const [passwordInput, setPasswordInput] = useState();
  const [passwordConfirmInput, setPasswordConfirmInput] = useState();

  const submitFormHandler = async (e) => {
    e.preventDefault();
    const nameSplited = emailInput.split("@")

    const res = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({
        email: emailInput,
        password: passwordInput,
        name:nameSplited[0],
        image:"https://res.cloudinary.com/djmonktf8/image/upload/v1669838527/budget-images/axzepr78sktwx0cy3htp.jpg"
      }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    console.log(data);
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-2 justify-center items-center">
      <div className="text-5xl p-2 text-white border-2  border-indigo-600 shadow-xl  rounded ">
        Soprah<span className="text-lg text-orange-500">Tech.</span>
      </div>
      <div className="z-10 flex flex-col items-center gap-2 p-3 pb-10 max-w-[600px] w-full sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 2xl:w-3/12 shadow-xl bg-white rounded-lg">
        <span className="text-xl text-stone-700 ">
          Welcome to SoChat App
          <span className="hand-wave text-2xl">👋</span>
        </span>

        <span className="text-4xl  text-stone-700 mt-3">Join Us!</span>
        <form
          onSubmit={submitFormHandler}
          className="flex flex-col gap-5 w-full mt-10"
        >
          <label className="flex  relative items-center border-indigo-600 group ">
            <MdAlternateEmail className="form-icon" />
            <input
              className="form-input "
              type="email"
              placeholder="E-mail"
              onChange={(e) => {
                setEmailInput(e.target.value);
              }}
            />
          </label>
          <label className="flex  relative items-center border-indigo-600 group ">
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
              className="form-input "
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              onChange={(e) => {
                setPasswordInput(e.target.value);
              }}
            />
          </label>
          <label className="flex  relative items-center border-indigo-600 group ">
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
              className="form-input "
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              onChange={(e) => {
                setPasswordConfirmInput(e.target.value);
              }}
            />
          </label>
          <button className="form-button">Join</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
