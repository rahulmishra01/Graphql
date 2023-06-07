import { useQuery } from "@apollo/client";
import React from "react";
import { GET_ALL_QUOTES } from "../gql/query";

const Home = () => {
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);

  if (loading) return <div className="font">Loading...</div>;

  if (data?.quote?.length === 0) {
    return <h1 className="font">No quote created</h1>;
  }

  return (
    <div className="container">
      {error && <div className="text red card-panel">{error.message}</div>}
      {data?.quote?.map((item, index) => (
        <blockquote key={index}>
          <h6 className="font">{item.name}</h6>
          <p className="right-align text">~{item?.by?.firstName}</p>
        </blockquote>
      ))}
    </div>
  );
};

export default Home;
