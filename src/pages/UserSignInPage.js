import React, { useEffect, useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import { useApiProgress } from "../components/ApiProgress";
import { useDispatch } from "react-redux";
import { signInHandler } from "../redux/authActions";

const UserSignInPage = (props) => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();

  useEffect(() => {
    setError(undefined);
  }, [username, password]);

  const dispatch = useDispatch();

  const onClickSignIn = async (event) => {
    event.preventDefault();
    const loginParams = {
      username: username,
      password: password,
    };
    setError(undefined);
    try {
      await dispatch(signInHandler(loginParams));
      props.history.push("/");
    } catch (apiError) {
      setError(apiError.response.data.errorMessage);
    }
  };

  const pendingApiCall = useApiProgress("post", "/api/1.0/auth");
  const { t } = useTranslation();

  return (
    <div className="container-md content-row p-4">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <div className="card h-100 p-4">
            <h1 className="text-center">{t("Sign In")}</h1>
            <form className="m-3">
              <Input
                id="usernameInput"
                name="username"
                label={t("Username")}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <Input
                id="passwordInput"
                name="password"
                label={t("Password")}
                type="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="text-center">
                <Button
                  text="Sign In"
                  className="btn btn-success w-100"
                  pendingApiCall={pendingApiCall}
                  onClick={onClickSignIn}
                ></Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignInPage;
