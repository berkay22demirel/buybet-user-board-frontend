import React from "react";
import { useSelector } from "react-redux";
import PostCreate from "../components/PostCreate";

const HomePage = () => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));
  return (
    <div className="container">
      <div className="row">{isLoggedIn && <PostCreate />}</div>
    </div>
  );
};

export default HomePage;
