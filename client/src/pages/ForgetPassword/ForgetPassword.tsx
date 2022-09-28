import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import "./../Auth/Auth.css";

interface IFormInput {
  email: string;
}

export const ForgetPassword = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);
  return (
    <div className="wrapper">
      <div id="formContent">
        <form>
          <h2 className="h2Forget ">Forgot Password</h2>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            name="login"
            placeholder="Your e-mail Address"
          />
          <input
            type="submit"
            className="fadeIn fourth"
            value="Reset Password"
          />
        </form>
      </div>
    </div>
  );
};
