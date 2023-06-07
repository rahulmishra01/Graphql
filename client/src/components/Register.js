import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { REGISTER } from "../gql/mutation";

const Register = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate("");

  const [register, { loading, error, data }] = useMutation(REGISTER);

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    register({
      variables: {
        newUser: formData,
      },
    });
    navigate("/login");
  };

  if (loading) return <div className="font">Loading...</div>;

  return (
    <div className="container my-container">
      {error && <div className="text red card-panel">{error.message}</div>}
      {data && data.user && (
        <div className="text green card-panel">
          {data.user.firstName} is register
        </div>
      )}
      <h5 className="font">Register!</h5>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          name="firstName"
          className="font"
          onChange={changeHandler}
          placeholder="Enter First Name here..."
          required
        />
        <input
          type="text"
          name="lastName"
          className="font"
          onChange={changeHandler}
          placeholder="Enter Last Name here..."
          required
        />
        <input
          type="email"
          name="email"
          className="font"
          onChange={changeHandler}
          placeholder="Enter email here..."
          required
        />
        <input
          type="password"
          name="password"
          className="font"
          onChange={changeHandler}
          placeholder="Enter password here..."
          required
        />
        <Link to="/login" className="text">
          <p>Already have an account ?</p>
        </Link>
        <button className="btn #673ab7 deep-purple" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
