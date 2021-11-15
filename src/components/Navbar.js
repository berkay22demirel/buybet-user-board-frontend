import React from "react";
import { withTranslation } from "react-i18next";

const Navbar = (props) => {
  const { t } = props;

  return (
    <nav className="navbar navbar-white border-bottom">
      <div className="container-md">
        <a className="navbar-brand">Buybet</a>
        <form className="d-flex">
          <button className="btn btn-outline-success me-2" type="submit">
            {t("Sign In")}
          </button>
          <button className="btn btn-outline-dark" type="submit">
            {t("Sign Up")}
          </button>
        </form>
      </div>
    </nav>
  );
};

export default withTranslation()(Navbar);
