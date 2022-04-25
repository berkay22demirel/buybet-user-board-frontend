import React from "react";
import defaultProfileImage from "../assets/profile-image.png";

const ProfileImage = (props) => {
  const { image, uploadedimage, username } = props;
  let imageSource = defaultProfileImage;
  console.log("image " + image);
  console.log("uploadedimage " + uploadedimage);
  console.log("username " + username);
  if (image) {
    imageSource = "images/" + image + ".jpg";
  }
  console.log("");
  return (
    <img
      className="rounded-circle shadow"
      src={uploadedimage || imageSource}
      alt={{ username } + " profile"}
      {...props}
      onError={(event) => (event.target.src = defaultProfileImage)}
    ></img>
  );
};

export default ProfileImage;
