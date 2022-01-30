import React from "react";
import defaultProfileImage from "../assets/profile-image.png";

const ProfileImage = (props) => {
  const { image } = props;
  let imageSource = defaultProfileImage;
  if (image) {
    imageSource = image;
  }
  return <img className="rounded-circle" src={imageSource} {...props}></img>;
};

export default ProfileImage;
