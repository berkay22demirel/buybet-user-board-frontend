import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

const UserPage = (props) => {
  const { loggedInUsername } = useSelector((store) => {
    return {
      loggedInUsername: store.username,
    };
  });
  const routerParams = useParams();
  const pathUsername = routerParams.username;
  let message = "we connot edit";
  if (pathUsername === loggedInUsername) {
    message = "we can edit";
  }
  return (
    <div className="container">
      <h1>User Page</h1>
      <div>{message}</div>
    </div>
  );
};

export default UserPage;
