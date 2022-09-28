import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Link } from "react-router-dom";
import { postRegisterUser } from "../../utils/api/api";
import { RegisterType } from "../../utils/types";
import "../Auth/Auth.css";

interface IFormInput {
  login: string;
  email: string;
  password: string;
}

export const SignUp = () => {
  const [active, setActive] = React.useState(0);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = async (data: RegisterType) => {
    console.log(data);
    try {
      await postRegisterUser(data);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="wrapper">
      <div id="formContent">
        <h2 className="inactive">
          <Link to="/">Sign In </Link>{" "}
        </h2>
        <h2 className="active underlineHover">Sign Up </h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="text"
            id="login"
            className="fadeIn second"
            placeholder="Login"
            {...register("login", {
              required: "Login is Required",
              minLength: 2,
              maxLength: 32,
            })}
          />
          {errors.login && (
            <span className="redSpan">{errors.login.message}</span>
          )}
          <input
            type="text"
            id="login"
            className="fadeIn third"
            placeholder="Email"
            {...register("email", {
              required: {
                value: true,
                message: "Email is Required",
              },
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.email && (
            <span className="redSpan">{errors.email.message}</span>
          )}
          <input
            type="password"
            id="password"
            className="fadeIn third"
            placeholder="Password"
            {...register("password", {
              required: "Password is Required",
              minLength: {
                value: 8,
                message: "Must be at least 8 characters",
              },
              maxLength: {
                value: 32,
                message: "Max characters is 32",
              },
            })}
          />
          {errors.password && (
            <span className="redSpan">{errors.password.message}</span>
          )}
          <input type="submit" className="fadeIn fourth" value="Register" />
        </form>
      </div>
    </div>
  );
};
