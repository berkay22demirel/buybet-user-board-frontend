import React from "react";
import { withTranslation } from "react-i18next";

const Button = (props) => {
  const { text, pendingApiCall, onClick, t } = props;
  return (
    <button
      type="button"
      className="btn btn-success w-100"
      onClick={onClick}
      disabled={pendingApiCall}
    >
      {pendingApiCall && (
        <span className="spinner-border spinner-border-sm"></span>
      )}
      {t(text)}
    </button>
  );
};

export default withTranslation()(Button);
