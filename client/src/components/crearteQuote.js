import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_QUOTE } from "../gql/mutation";

const CrearteQuote = () => {
  const [quote, setQuote] = useState("");

  const [createQuote, { loading, error, data }] = useMutation(CREATE_QUOTE, {
    refetchQueries: ["getAllQuotes"],
  });

  const submitHandler = (e) => {
    e.preventDefault();
    createQuote({
      variables: {
        name: quote,
      },
    }).then(() => {
      setQuote("");
    });
  };

  if (loading) return <div className="font">Loading...</div>;

  return (
    <div className="container my-container">
      {error && <div className="text red card-panel">{error.message}</div>}
      {data && data.createQuote && (
        <div className="green text card-panel">{data.createQuote}</div>
      )}
      <form style={{ marginTop: "10rem" }} onSubmit={submitHandler}>
        <input
          type="text"
          className="font"
          value={quote}
          placeholder="write your quote here"
          onChange={(e) => setQuote(e.target.value)}
        />
        <button className="btn green">create</button>
      </form>
    </div>
  );
};

export default CrearteQuote;
