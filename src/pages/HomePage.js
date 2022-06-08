import React from "react";
import { useSelector } from "react-redux";
import PostList from "../components/PostList";
import PostCreate from "../components/PostCreate";

const HomePage = () => {
  const { isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
  }));
  return (
    <div className="container">
      <div className="row">{isLoggedIn && <PostCreate />}</div>
      <div className="row">
        <PostList></PostList>
      </div>
    </div>
  );
};

export default HomePage;
