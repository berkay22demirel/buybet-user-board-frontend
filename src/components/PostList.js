import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { getOldPosts, getNewPosts, getPosts } from "../api/userApiCalls";
import { useApiProgress } from "./ApiProgress";
import Post from "./Post";
import Button from "../components/Button";
import { useParams } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState({ content: [], last: true, number: 0 });
  const [t] = useTranslation();
  const { username } = useParams();
  let lastPostId = 0;
  let firstPostId = 0;
  if (posts.content.length > 0) {
    lastPostId = posts.content[posts.content.length - 1].id;
    firstPostId = posts.content[0].id;
  }
  const loadOldPostsPath = username
    ? "/api/1.0/users/" + username + "/posts/" + lastPostId
    : "/api/1.0/posts/" + lastPostId;
  const pendingLoadOldPostsApiCall = useApiProgress(
    "get",
    loadOldPostsPath,
    true
  );
  const loadNewPostsPath = username
    ? "/api/1.0/users/" +
      username +
      "/posts/" +
      firstPostId +
      "?direction=after"
    : "/api/1.0/posts/" + firstPostId + "?direction=after";
  const pendingLoadNewPostsApiCall = useApiProgress(
    "get",
    loadNewPostsPath,
    true
  );

  useEffect(() => {
    const loadPosts = async (page) => {
      try {
        const response = await getPosts(username, page);
        setPosts((previousPosts) => ({
          ...response.data.data,
          content: [...previousPosts.content, ...response.data.data.content],
        }));
      } catch (error) {}
    };
    loadPosts();
  }, [username]);

  const loadOldPosts = async () => {
    try {
      const response = await getOldPosts(lastPostId, username);
      setPosts((previousPosts) => ({
        ...response.data.data,
        content: [...previousPosts.content, ...response.data.data.content],
      }));
    } catch (error) {}
  };

  const loadNewPosts = async () => {
    try {
      const response = await getNewPosts(firstPostId, username);
      setPosts((previousPosts) => ({
        ...previousPosts,
        content: [...response.data.data, ...previousPosts.content],
      }));
    } catch (error) {}
  };

  const onDeletePost = (id) => {
    console.log("sdfas");
    setPosts((previousPosts) => ({
      ...previousPosts,
      content: previousPosts.content.filter((post) => {
        if (id === post.id) {
          return false;
        }
        return true;
      }),
    }));
  };

  return (
    <div className="p-0">
      <Button
        className="btn btn-primary col-12 mt-2"
        onClick={() => loadNewPosts()}
        pendingApiCall={pendingLoadNewPostsApiCall}
        disabled={pendingLoadNewPostsApiCall}
        text={t("Load New Post")}
      />
      {posts.content.map((post) => {
        return (
          <Post key={post.id} post={post} onDeletePost={onDeletePost}></Post>
        );
      })}
      {!posts.last && (
        <Button
          className="btn btn-primary col-12"
          onClick={() => loadOldPosts()}
          pendingApiCall={pendingLoadOldPostsApiCall}
          disabled={pendingLoadOldPostsApiCall}
          text={t("Load Old Post")}
        />
      )}
    </div>
  );
};

export default PostList;
