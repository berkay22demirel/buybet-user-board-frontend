import React from "react";
import { withTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import logo from "../assets/buybet-logo.png";

class Navbar extends React.Component {
  render() {
    const { t } = this.props;
    return (
      <div>
        <nav className="navbar navbar-white shadow-sm mb-2">
          <div className="container-md">
            <Link className="navbar-brand d-flex align-items-center" to="/">
              <img src={logo} width="40" alt="Buybet Logo" />
              Buybet
            </Link>
            <div className="d-flex">
              <Link className="btn btn-outline-success me-2" to="/signin">
                {t("Sign In")}
              </Link>
              <Link className="btn btn-outline-dark" to="/signup">
                {t("Sign Up")}
              </Link>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default withTranslation()(Navbar);
