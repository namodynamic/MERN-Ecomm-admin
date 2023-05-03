import React from "react";
import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  return (
    <div
      className="py-5"
      style={{ background: " #192a51", minHeight: "100vh" }}
    >
      <br />
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Enter your registered email to get password reset mail.
        </p>
        <form action="">
          <CustomInput type="text" label="Email Address" id="email" />

          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100"
            style={{ background: " #192a51" }}
            type="submit"
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
