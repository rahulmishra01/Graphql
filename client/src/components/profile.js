import React, { useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_PROFILE } from "../gql/query";
import { DELETE_PROFILE } from "../gql/mutation";
import { useNavigate } from "react-router-dom";
import { DELETE_QUOTE_ONLY } from "../gql/mutation";

const Profile = () => {
  const { loading, error, data, refetch } = useQuery(GET_PROFILE);
  const releted = data ? data.myProfile : "";
  const navigate = useNavigate("");

  const [deleteUser] = useMutation(DELETE_PROFILE, {
    refetchQueries: ["getAllQuotes"],
  });

  useEffect(() => {
    refetch();
  }, [refetch]);

  const [deleteQuoteOnly, { data: dltData }] = useMutation(DELETE_QUOTE_ONLY, {
    refetchQueries: ["getAllQuotes"],
  });

  const deleteQuoteHandler = async (_id) => {
    deleteQuoteOnly({
      variables: {
        _id: _id,
      },
    }).then(() => {
      refetch();
    });
  };

  if (loading) return <div className="font">Loading...</div>;

  if (!localStorage.getItem("token")) {
    return (
      <h1
        className="red card-panel text"
        style={{ marginTop: "5rem", width: "15rem", marginLeft: "50rem" }}
      >
        {error.message}
      </h1>
    );
  }

  return (
    <div className="container my-container">
      <div className="center-align">
        <img
          className="circle"
          style={{ border: "2px solid", marginTop: "10px" }}
          src={`https://robohash.org/${releted?.firstName}.png?size=200x200`}
          alt="pic"
        />
        <h5 className="font">
          {releted?.firstName} {releted?.lastName}
        </h5>
        <h6 className="font">Email - {releted?.email}</h6>
        <div style={{ marginTop: "3rem" }}>
          <button
            className="text card-panel"
            style={{ color: "green", border: "none" }}
            onClick={() => navigate("/updateprofile", { state: data })}
          >
            Update Profile
          </button>
          <button
            className="text red card-panel"
            style={{ border: "none", marginLeft: "2rem" }}
            onClick={() => {
              deleteUser({
                variables: {
                  _id: data.myProfile._id,
                },
              });
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            Delete
          </button>
        </div>
      </div>
      <h3 className="font">Your quotes</h3>
      <p className={`${dltData?.alias ? "text card-panel red" : ""}`}>
        {dltData?.alias}
      </p>
      {releted?.quotes?.map((item, index) => {
        return (
          <blockquote key={index}>
            <h6 className="font">{item.name}</h6>
            <button
              onClick={() =>
                navigate(`/updatequote/${item._id}`, {
                  state: { name: item.name, id: item._id },
                })
              }
              className="text green"
            >
              Update quote
            </button>
            <button
              className="text red"
              style={{ marginLeft: "10%" }}
              onClick={() => deleteQuoteHandler(item._id)}
            >
              Delete quote
            </button>
          </blockquote>
        );
      })}
    </div>
  );
};
export default Profile;
