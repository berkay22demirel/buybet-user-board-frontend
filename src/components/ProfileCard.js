import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import ProfileImage from "./ProfileImage";

const ProfileCard = (props) => {
  const { loggedInUsername } = useSelector((store) => {
    return {
      loggedInUsername: store.username,
    };
  });
  const { user } = props;
  const { username, image, photo, email } = user;
  const routerParams = useParams();
  const pathUsername = routerParams.username;
  let message = "we connot edit";
  if (pathUsername === loggedInUsername) {
    message = "we can edit";
  }
  return (
    <div className="card">
      <div className="card-header">
        <ProfileImage
          className="rounded-circle shadow"
          width="200"
          height="200"
          alt={{ username } + " profile"}
          image={image}
        ></ProfileImage>
      </div>
      <div className="card-body text-center">
        <h3>{username}</h3>
      </div>
    </div>
  );
};

export default ProfileCard;
