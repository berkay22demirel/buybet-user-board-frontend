import React, { useRef, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router";
import ProfileImage from "./ProfileImage";
import Input from "../components/Input";
import Button from "../components/Button";
import { useApiProgress } from "../components/ApiProgress";
import { deleteUser, updateUser } from "../api/userApiCalls";
import { logoutSuccess, updateSuccess } from "../redux/authActions";
import Modal from "./Modal";
import { useHistory } from "react-router-dom";

const ProfileCard = (props) => {
  const [inEditMode, setInEditMode] = useState(false);
  const [editable, setEditable] = useState(false);
  const [user, setUser] = useState({});
  const [newImage, setNewImage] = useState();
  const [newEmail, setNewEmail] = useState();
  const [menuVisible, setMenuVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const menuArea = useRef(null);
  const [validationErrors, setValidationErrors] = useState({});
  const dispatch = useDispatch();
  const { loggedInUsername } = useSelector((store) => ({
    loggedInUsername: store.username,
  }));
  const { username, image, email } = user;
  const pathUsername = useParams().username;
  const error = false;
  const pendingApiCall = useApiProgress(
    "put",
    "/api/1.0/users/" + username,
    true
  );
  const pendingUserDeleteApiCall = useApiProgress(
    "delete",
    "/api/1.0/users/" + username,
    true
  );
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    setUser(props.user);
  }, [props.user]);
  useEffect(() => {
    setEditable(pathUsername === loggedInUsername);
  }, [pathUsername, loggedInUsername]);
  useEffect(() => {
    if (!inEditMode) {
      setNewEmail(undefined);
      setNewImage(undefined);
    } else {
      setNewEmail(email);
    }
  }, [inEditMode, email]);
  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      email: undefined,
    }));
  }, [newEmail]);
  useEffect(() => {
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      image: undefined,
    }));
  }, [newImage]);

  const onClickSave = async () => {
    let image;
    if (newImage) {
      image = newImage.split(",")[1];
    }

    const updatedUser = {
      email: newEmail,
      image: image,
    };
    try {
      const response = await updateUser(username, updatedUser);
      setInEditMode(false);
      setUser(response.data.data);
      dispatch(
        updateSuccess(response.data.data.username, response.data.data.image)
      );
    } catch (error) {
      setValidationErrors(error.response.data.validationErrors);
    }
  };

  const onChangeImage = (event) => {
    if (event.target.files.length < 1) {
      return;
    }
    const file = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setNewImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  };

  const onClickFollow = () => {
    console.log("click follow");
  };

  let inputImageElement = undefined;

  const onClickDelete = async () => {
    await deleteUser(username);
    setMenuVisible(false);
    setModalVisible(false);
    dispatch(logoutSuccess());
    history.push("/");
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
      <div className="card">
        <div className="card-header row align-items-center m-0">
          <div className="col-md-4 col-12 d-flex justify-content-md-start justify-content-center">
            {!inEditMode && (
              <ProfileImage
                width="200"
                height="200"
                image={image}
                uploadedimage={newImage}
                username={username}
              ></ProfileImage>
            )}
            {inEditMode && (
              <>
                <ProfileImage
                  width="200"
                  height="200"
                  image={image}
                  uploadedimage={newImage}
                  username={username}
                  style={{ cursor: "pointer", opacity: "0.7" }}
                  onClick={() => inputImageElement.click()}
                ></ProfileImage>
                <input
                  className="form-control"
                  type="file"
                  id="inputImage"
                  ref={(input) => (inputImageElement = input)}
                  style={{ display: "none" }}
                  onChange={onChangeImage}
                />
                {validationErrors.image && (
                  <div class="alert alert-danger" role="alert">
                    {validationErrors.image}
                  </div>
                )}
              </>
            )}
          </div>
          <div className="col-md-2 col-3 mt-2">
            <div>58</div>
            <div>post</div>
          </div>
          <div className="col-md-2 col-3 mt-2">
            <div>65</div>
            <div>followers</div>
          </div>
          <div className="col-md-2 col-3 mt-2">
            <div>34</div>
            <div>following</div>
          </div>
          <div className="col-md-2 col-3 mt-2">
            <div>125</div>
            <div>likes</div>
          </div>
        </div>
        {!inEditMode && (
          <div className="card-body d-flex justify-content-between">
            <h3 className="m-auto ms-3">{username}</h3>
            {editable && (
              <div className="d-flex">
                <button
                  className="btn btn-outline-primary"
                  onClick={() => setInEditMode(true)}
                >
                  {t("Edit Profile")}
                </button>
                <div
                  className="dropdown m-auto"
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
                      {t("Delete My Account")}
                    </div>
                  </div>
                </div>
              </div>
            )}
            {!editable && (
              <button
                className="btn btn-outline-primary"
                onClick={() => onClickFollow}
              >
                {t("Follow")}
              </button>
            )}
          </div>
        )}
        {inEditMode && (
          <div className="card-body text-center">
            <div className="content-row">
              <div className="col-sm-12 col-lg-6 offset-lg-3">
                <h2>{t("Edit Profile")}</h2>
                <form className="m-3">
                  <Input
                    id="emailInput"
                    name="email"
                    label={t("Email")}
                    defaultValue={email}
                    onChange={(event) => setNewEmail(event.target.value)}
                    error={validationErrors.email}
                  />
                  {error && <div className="alert alert-danger">{error}</div>}
                  <div className="d-flex justify-content-evenly">
                    <Button
                      text={t("Save")}
                      className="btn btn-outline-primary w-25"
                      pendingApiCall={pendingApiCall}
                      onClick={onClickSave}
                    ></Button>
                    <Button
                      text={t("Cancel")}
                      className="btn btn-outline-primary w-25"
                      pendingApiCall={pendingApiCall}
                      onClick={() => setInEditMode(false)}
                    ></Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
      <Modal
        visible={modalVisible}
        title="Delete My Account"
        body="Are you sure to delete your account?"
        buttonText="Delete"
        onClickCancel={onClickCancel}
        onClickButton={onClickDelete}
        pendingApiCall={pendingUserDeleteApiCall}
      ></Modal>
    </>
  );
};

export default ProfileCard;
