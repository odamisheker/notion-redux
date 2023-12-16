import React, { useState } from "react";
import { User } from "../util/validation";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/user/actions";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const [date, setDate] = useState(Date.now());

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const userData = User.parse({email, password, date});
      if (password !== confirmPassword) {
        setErrors("Пароли не совпадают")
      }
      await dispatch(addUser(userData));

      navigate("/");
      setErrors(null);
    } catch (err) {
      setErrors(err?.toString());
    }
  };

  return (
    <div className="prose flex flex-col gap-5 m-auto mt-6">
      <h1>Sign Up</h1>
      <input
        placeholder="email"
        className="border-2 border-solid border-black rounded-xl pl-2"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      {errors?.email && (
        <div className="text-red-500">{errors?.email?._errors}</div>
      )}
      <input
        placeholder="password"
        className="border-2 border-solid border-black rounded-xl pl-2"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        placeholder="confirm password"
        className="border-2 border-solid border-black rounded-xl pl-2"
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      {errors?.password && (
        <div className="text-red-500">{errors?.password?._errors}</div>
      )}
      <button type="button" onClick={registerUser}>
        Зарегистрироваться
      </button>
      <div>
        <Link to="/login" className=" ml-52">
          Уже зарегистрированы?
        </Link>
      </div>
    </div>
  );
};

export default SignUp;


