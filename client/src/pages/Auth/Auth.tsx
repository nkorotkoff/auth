import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { postLoginUser } from "../../utils/api/api";
import { LoginType } from "../../utils/types";
import "./Auth.css";

interface IFormInput {
  login: string;
  password: string;
}

export const Auth = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data: LoginType) => {
    try {
      await postLoginUser(data);
      console.log("Success");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="wrapper">
      <div id="formContent">
        <h2 className="active">Sign In </h2>
        <h2 className="inactive underlineHover">
          <Link to="/signup">Sign Up </Link>
        </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="login"
            className="second"
            placeholder="Login"
            {...register("login", {
              required: true,
            })}
          ></input>
          <input
            type="password"
            id="password"
            className="third"
            placeholder="Password"
            {...register("password", { required: true })}
          />
          <input type="submit" className="fadeIn fourth" value="Log In" />
        </form>
        {(errors.login || errors.password) && (
          <span className="redSpan">Login and Password are required</span>
        )}

        <div id="formFooter">
          <a className="underlineHover" href="#">
            <Link to="/forgetpassword">Forgot Password?</Link>
          </a>
        </div>
      </div>
    </div>
  );
};
