import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getPosts } from "../api/userApiCalls";
import { useApiProgress } from "./ApiProgress";
import Post from "./Post";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState({ content: [], last: true, number: 0 });
  const [t] = useTranslation();
  const { username } = useParams();
  const getPostsPath = username
    ? "/api/1.0/users/" + username + "/posts?page="
    : "/api/1.0/posts?page=";
  const pendingApiCall = useApiProgress("get", getPostsPath, false);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async (page) => {
    try {
      const response = await getPosts(username, page);
      setPosts((previousPosts) => ({
        ...response.data.data,
        content: [...previousPosts.content, ...response.data.data.content],
      }));
    } catch (error) {}
  };

  return (
    <div className="p-0">
      {posts.content.map((post) => {
        return <Post key={post.id} post={post}></Post>;
      })}
      {!posts.last && (
        <Button
          className="btn btn-primary col-12"
          onClick={() => loadPosts(posts.number + 1)}
          pendingApiCall={pendingApiCall}
          disabled={pendingApiCall}
          text={t("Load Old Post")}
        />
      )}
    </div>
  );
};

export default PostList;
