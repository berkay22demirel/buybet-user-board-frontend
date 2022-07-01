import React, { useRef, useState } from "react";
import ProfileImage from "../components/ProfileImage";
import { Link } from "react-router-dom";
import { format } from "timeago.js";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { deletePost } from "../api/userApiCalls";
import Modal from "./Modal";
import { useApiProgress } from "./ApiProgress";

const Post = (props) => {
  const loggedInUsername = useSelector((store) => store.username);
  const { post, onDeletePost } = props;
  const { id, user, content, postDate } = post;
  const { username, image } = user;
  const { i18n, t } = useTranslation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const menuArea = useRef(null);
  const formattedDate = format(postDate, i18n.language);
  const pendingDeleteApiCall = useApiProgress("delete", "api/1.0/posts/" + id);
  const onClickDelete = async () => {
    setMenuVisible(false);
    await deletePost(id);
    onDeletePost(id);
  };
  const onClickCancel = () => {
    setModalVisible(false);
  };
  const menuClickTrigger = (event) => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };
  document.addEventListener("click", menuClickTrigger);
  let dropdownMenuClassName = "dropdown-menu p-1 m-0 shadow";
  if (menuVisible) {
    dropdownMenuClassName += " show";
  }
  return (
    <>
      <div className="card mt-2 mb-2 text-start">
        <div className="card-header row m-0">
          <Link className="col-11 m-0 row" to={"/user/" + username}>
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
          {loggedInUsername === username && (
            <div
              className="dropdown col-1 m-auto text-end"
              ref={menuArea}
              style={{ cursor: "pointer" }}
            >
              <span
                className="material-icons"
                onClick={() => {
                  setMenuVisible(true);
                }}
              >
                more_vert
              </span>
              <div className={dropdownMenuClassName}>
                <div
                  className="dropdown-item"
                  onClick={() => setModalVisible(true)}
                >
                  {t("Delete")}
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="card-body">
          <p className="card-text">{content}</p>
        </div>
        <div className="card-footer text-muted">{formattedDate}</div>
      </div>
      <Modal
        visible={modalVisible}
        title="Delete Post"
        body="Are you sure to delete post?"
        buttonText="Delete"
        onClickCancel={onClickCancel}
        onClickButton={onClickDelete}
        pendingApiCall={pendingDeleteApiCall}
      ></Modal>
    </>
  );
};

export default Post;
