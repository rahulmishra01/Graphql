import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { UPDATE_QUOTE } from "../gql/mutation";

const UpdateProfile = () => {
  const location = useLocation();
  const [quote, setQuote] = useState({
    by: location.state.id,
    name: location.state.name,
  });

  const [updateQuote, { loading, error, data }] = useMutation(UPDATE_QUOTE);

  if (loading) return <div className="font">Loading...</div>;

  const submitHandler = (e) => {
    e.preventDefault();
    updateQuote({
      variables: {
        update: quote,
      },
    });
  };

  return (
    <div className="container my-container">
      {error && <div className="text red card-panel">{error.message}</div>}
      {data && (
        <div className="text green card-panel">
          {data.updateQuote.name} is updated
        </div>
      )}
      <h5 className="font">Update Quote !</h5>
      <form style={{ marginTop: "5rem" }} onSubmit={submitHandler}>
        <input
          type="text"
          name="name"
          className="font"
          value={quote.name}
          onChange={(e) => setQuote({ ...quote, name: e.target.value })}
          placeholder="Enter text here..."
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
