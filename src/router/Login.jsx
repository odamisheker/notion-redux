import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/user/actions";
import { selectUserError } from "../redux/user/selectors";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userError = useSelector(selectUserError);

  function handleLogin() {
    dispatch(getUser(email, password)).then(
      () => navigate("/"),
      (err) => console.error(err)
    );
  }

  return (
    <div className="prose flex flex-col gap-5 m-auto mt-6">
      <h1>Login</h1>
      <input
        className="border-2 border-solid border-black rounded-xl pl-2"
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className="border-2 border-solid border-black rounded-xl pl-2"
        placeholder="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleLogin}>Login</button>
      {userError && <div className="text-red-500">{userError}</div>}
      <div>
        <Link to="/signup" className="no-underline ml-56">
          У вас нет аккаунта?
        </Link>
      </div>
    </div>
  );
}
