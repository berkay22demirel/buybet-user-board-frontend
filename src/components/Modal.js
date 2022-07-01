import React from "react";
import { useTranslation } from "react-i18next";
import Button from "./Button";

const Modal = (props) => {
  const {
    visible,
    title,
    body,
    buttonText,
    onClickCancel,
    onClickButton,
    pendingApiCall,
  } = props;
  const { t } = useTranslation();
  let className = "modal fade";
  if (visible) {
    className += " show d-block";
  }
  return (
    <div className={className} style={{ backgroundColor: "#000000b0" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{t(title)}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onClickCancel}
              hidden={pendingApiCall}
            ></button>
          </div>
          <div className="modal-body text-start">{t(body)}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-primary"
              onClick={onClickCancel}
              disabled={pendingApiCall}
            >
              {t("Cancel")}
            </button>
            <Button
              className="btn btn-danger"
              onClick={onClickButton}
              text={t(buttonText)}
              pendingApiCall={pendingApiCall}
              disable={pendingApiCall}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
