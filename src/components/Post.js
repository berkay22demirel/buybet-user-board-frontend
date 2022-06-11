import React from "react";
import ProfileImage from "../components/ProfileImage";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";

const Post = (props) => {
  const { post } = props;
  const { user, content, postDate } = post;
  const { username, image } = user;
  const { i18n } = useTranslation();
  const formattedDate = format(postDate, i18n.language);
  return (
    <div className="card mt-2 mb-2 text-start">
      <Link className="card-header row m-0" to={"/user/" + username}>
        <div className="col-2">
          <ProfileImage
            image={image}
            username={username}
            width="40"
            height="40"
          ></ProfileImage>
        </div>
        <div className="col-10 m-auto">{username}</div>
      </Link>
      <div className="card-body">
        <p className="card-text">{content}</p>
      </div>
      <div className="card-footer text-muted">{formattedDate}</div>
    </div>
  );
};

export default Post;
