import Button from "../components/Button";
import React, { useState } from "react";
import { createPost } from "../api/userApiCalls";
import { useApiProgress } from "../components/ApiProgress";
import { useTranslation } from "react-i18next";

const PostCreate = () => {
  const pendingApiCall = useApiProgress("post", "/api/1.0/posts");
  const { t } = useTranslation();
  const [post, setPost] = useState("");
  const onClickSend = async () => {
    const body = {
      content: post,
    };
    try {
      await createPost(body);
      setPost("");
    } catch (error) {}
  };
  return (
    <div className="card p-3">
      <textarea
        className="form-control"
        rows="3"
        maxLength="210"
        onChange={(event) => setPost(event.target.value)}
        value={post}
      ></textarea>
      <div className="text-end mt-2">
        <Button
          className="btn btn-primary"
          onClick={onClickSend}
          pendingApiCall={pendingApiCall}
          disabled={post.length < 1 || pendingApiCall ? true : false}
          text={t("Send")}
        />
      </div>
    </div>
  );
};

export default PostCreate;
