import React from "react";

const Post = (props) => {
  const { post } = props;
  return <div className="card mt-2 mb-2 p-1">{post.content}</div>;
};

export default Post;
