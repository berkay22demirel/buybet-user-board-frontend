import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/buybet-logo.png";
import { logoutSuccess } from "../redux/authActions";
import { useDispatch, useSelector } from "react-redux";

const Navbar = (props) => {
  const { t } = useTranslation();
  const { username, isLoggedIn } = useSelector((store) => ({
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  }));
  const dispatch = useDispatch();
  const onLogoutSuccess = () => dispatch(logoutSuccess());
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
    links = (
      <div className="d-flex">
        <Link className="btn btn-outline-success me-2" to={"/user/" + username}>
          {username}
        </Link>
        <Link className="btn btn-outline-dark" onClick={onLogoutSuccess} to="/">
          {t("Logout")}
        </Link>
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
