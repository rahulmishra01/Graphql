import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UPDATE_PROFILE } from "../gql/mutation";

const UpdateProfile = () => {
  const location = useLocation();
  const navigate = useNavigate("")
  const [getData, setGetData] = useState({
    _id: location.state.myProfile._id,
    firstName: location.state?.myProfile.firstName,
    lastName: location.state?.myProfile.lastName,
    email: location.state?.myProfile.email,
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setGetData({
      ...getData,
      [name]: value,
    });
  };

  const [updateUser, { loading, error }] = useMutation(UPDATE_PROFILE);

  if (loading) return <div className="font">Loading...</div>;

  const submitHandler = (e) => {
    e.preventDefault();
    updateUser({
      variables: {
        data: getData,
      },
    }).then(() => {
      navigate("/profile")
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="text red card-panel">{error.message}</div>}
      <h5 className="font">Update Profile !</h5>
      <form style={{ marginTop: "5rem" }} onSubmit={submitHandler}>
        <input
          type="text"
          name="firstName"
          className="font"
          value={getData.firstName}
          onChange={changeHandler}
          placeholder="Enter First Name here..."
          required
        />
        <input
          type="text"
          name="lastName"
          className="font"
          value={getData.lastName}
          onChange={changeHandler}
          placeholder="Enter Last Name here..."
          required
        />
        <input
          type="email"
          name="email"
          className="font"
          value={getData.email}
          onChange={changeHandler}
          placeholder="Enter email here..."
          required
        />
        <button className="btn #673ab7 deep-purple" type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
