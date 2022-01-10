import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/buybet-logo.png";
import { logoutSuccess } from "../redux/authActions";
import { connect } from "react-redux";

class Navbar extends React.Component {
  render() {
    const { t, username, isLoggedIn, onLogoutSuccess } = this.props;
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
          <Link
            className="btn btn-outline-success me-2"
            to={"/user/" + username}
          >
            {username}
          </Link>
          <Link
            className="btn btn-outline-dark"
            onClick={onLogoutSuccess}
            to="/"
          >
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
  }
}

const mapStateToProps = (store) => {
  return {
    isLoggedIn: store.isLoggedIn,
    username: store.username,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogoutSuccess: () => dispatch(logoutSuccess()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(Navbar));
