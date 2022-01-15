import React, { useState } from "react";
import Input from "../components/Input";
import { useTranslation } from "react-i18next";
import Button from "../components/Button";
import { useApiProgress } from "../components/ApiProgress";
import { useDispatch } from "react-redux";
import { signUpHandler } from "../redux/authActions";

const UserSignUpPage = (props) => {
  const [
    form = {
      username: null,
      email: null,
      phone: null,
      password: null,
      passwordRepeat: null,
    },
    setForm,
  ] = useState();
  const [validationErrors, setValidationErrors] = useState({});

  const dispatch = useDispatch();

  const isSamePassword = () => form.password === form.passwordRepeat;

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((previousForm) => ({ ...previousForm, [name]: value }));
    setValidationErrors((previousValidationErrors) => ({
      ...previousValidationErrors,
      [name]: undefined,
    }));
  };

  const onClickSignUp = async (event) => {
    if (isSamePassword()) {
      event.preventDefault();
      const user = {
        username: form.username,
        email: form.email,
        phone: form.phone,
        password: form.password,
      };
      try {
        await dispatch(signUpHandler(user));
        props.history.push("/");
      } catch (error) {
        if (error.response.data.validationErrors) {
          setValidationErrors(error.response.data.validationErrors);
        }
      }
    }
  };

  const pendingSignInApiCall = useApiProgress("/api/1.0/auth");
  const pendingSignUpApiCall = useApiProgress("/api/1.0/users");
  const { t } = useTranslation();

  let passwordRepeatError;
  if (!isSamePassword()) {
    passwordRepeatError = t("password missmatch");
  }

  return (
    <div className="container-md content-row p-4">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <div className="card h-100 p-4">
            <h1 className="text-center">{t("Sign Up")}</h1>
            <form className="m-3">
              <Input
                id="usernameInput"
                name="username"
                label={t("Username")}
                error={validationErrors.username}
                onChange={onChange}
              />
              <Input
                id="emailInput"
                name="email"
                label={t("Email address")}
                error={validationErrors.email}
                onChange={onChange}
              />
              <Input
                id="phoneInput"
                name="phone"
                label={t("Phone number")}
                error={validationErrors.phone}
                onChange={onChange}
              />
              <Input
                id="passwordInput"
                name="password"
                label={t("Password")}
                type="password"
                error={validationErrors.password}
                onChange={onChange}
              />
              <Input
                id="passwordRepeatInput"
                name="passwordRepeat"
                label={t("Password repeat")}
                type="password"
                error={passwordRepeatError}
                onChange={onChange}
              />
              <div className="text-center">
                <Button
                  text="Sign Up"
                  pendingApiCall={pendingSignInApiCall || pendingSignUpApiCall}
                  onClick={onClickSignUp}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUpPage;
