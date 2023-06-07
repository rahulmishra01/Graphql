import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN } from "../gql/mutation";

const Login = () => {
  const navigate = useNavigate("");
  const [formData, setFormdata] = useState({});
  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: async (data) => {
      const token = data.user.token;
      localStorage.setItem("token", token);
      navigate("/");
      if (token) {
        return window.location.reload();
      }
    },
  });

  function changehandler(e) {
    const { name, value } = e.target;
    setFormdata({
      ...formData,
      [name]: value,
    });
  }

  const submitHandler = (e) => {
    e.preventDefault();
    login({
      variables: {
        loginUser: formData,
      },
    });
  };

  if (loading) return <div className="font">Loading...</div>;

  return (
    <div className="container my-container">
      {error && <div className="text red card-panel">{error.message}</div>}
      <h5 className="font">Login !</h5>
      <form onSubmit={submitHandler}>
        <input
          type="email"
          name="email"
          onChange={changehandler}
          placeholder="Enter email here..."
          required
          className="font"
        />
        <input
          type="password"
          name="password"
          onChange={changehandler}
          placeholder="Enter password here..."
          required
          className="font"
        />
        <Link to="/register" className="text">
          <p>Don't have account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple text" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
