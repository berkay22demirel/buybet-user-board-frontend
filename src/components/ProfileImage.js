import React from "react";
import defaultProfileImage from "../assets/profile-image.png";

const ProfileImage = (props) => {
  const { image, uploadedimage, username } = props;
  let imageSource = defaultProfileImage;
  if (image) {
    imageSource = "images/" + image + ".jpg";
  }
  return (
    <img
      className="rounded-circle shadow m-auto"
      src={uploadedimage || imageSource}
      alt={{ username } + " profile"}
      {...props}
      onError={(event) => (event.target.src = defaultProfileImage)}
    ></img>
  );
};

export default ProfileImage;
