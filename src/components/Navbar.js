import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/buybet-logo.png";
import { logoutSuccess } from "../redux/authActions";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "./ProfileImage";

const Navbar = (props) => {
  const { t } = useTranslation();
  const { username, isLoggedIn, image } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
    image: store.image,
  }));
  const dispatch = useDispatch();
  const onLogoutSuccess = () => dispatch(logoutSuccess());
  const [menuVisible, setMenuVisible] = useState(false);
  const menuArea = useRef(null);
  useEffect(() => {
    document.addEventListener("click", menuClickTrigger);
    return () => {
      document.removeEventListener("click", menuClickTrigger);
    };
  }, [isLoggedIn]);
  const menuClickTrigger = (event) => {
    if (menuArea.current === null || !menuArea.current.contains(event.target)) {
      setMenuVisible(false);
    }
  };
  let links = (
    <div className="d-flex">
      <Link className="btn btn-outline-success me-2" to="/signin">
        {t("Sign In")}
      </Link>
      <Link className="btn btn-outline-dark" to="/signup">
        {t("Sign Up")}
      </Link>
    </div>
  );
  if (isLoggedIn) {
    let dropdownMenuClassName = "dropdown-menu p-1 m-0 shadow";
    if (menuVisible) {
      dropdownMenuClassName += " show";
    }
    links = (
      <div>
        <div
          className="d-flex dropdown"
          ref={menuArea}
          style={{ cursor: "pointer" }}
        >
          <ProfileImage
            width="32"
            height="32"
            image={image}
            username={username}
          ></ProfileImage>
          <span
            className="nav-link dropdown-toggle"
            onClick={() => {
              setMenuVisible(true);
            }}
          >
            {username}
          </span>
        </div>
        <div className={dropdownMenuClassName}>
          <Link className="dropdown-item" to={"/user/" + username}>
            {t("My Profile")}
          </Link>
          <Link className="dropdown-item" onClick={onLogoutSuccess} to="/">
            {t("Logout")}
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <nav className="navbar navbar-white shadow-sm mb-2">
        <div className="container-md">
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img src={logo} width="40" alt="Buybet Logo" />
            Buybet
          </Link>
          {links}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
