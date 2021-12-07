import React from "react";
import { signUp } from "../api/userApiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import Button from "../components/Button";
import { withApiProgress } from "../components/ApiProgress";

class UserSignUpPage extends React.Component {
  state = {
    username: null,
    email: null,
    phone: null,
    password: null,
    passwordRepeat: null,
    validationErrors: {},
  };

  onChange = (event) => {
    const { name, value } = event.target;
    const validationErrors = { ...this.state.validationErrors };
    validationErrors[name] = undefined;
    this.setState({
      [name]: value,
      validationErrors,
    });
  };

  onClickSignUp = async (event) => {
    if (
      this.state.password !== this.state.passwordRepeat ||
      this.state.password == null ||
      this.state.passwordRepeat == null
    ) {
      const { t } = this.props;
      const validationErrors = { ...this.state.validationErrors };
      validationErrors["passwordRepeat"] = t("password missmatch");
      this.setState({ validationErrors });
    } else {
      event.preventDefault();
      const user = {
        username: this.state.username,
        email: this.state.email,
        phone: this.state.phone,
        password: this.state.password,
      };
      try {
        await signUp(user);
      } catch (error) {
        if (error.response.data.validationErrors) {
          this.setState({
            validationErrors: error.response.data.validationErrors,
          });
        }
      }
    }
  };

  render() {
    const { t, pendingApiCall } = this.props;
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
                  error={this.state.validationErrors.username}
                  onChange={this.onChange}
                />
                <Input
                  id="emailInput"
                  name="email"
                  label={t("Email address")}
                  error={this.state.validationErrors.email}
                  onChange={this.onChange}
                />
                <Input
                  id="phoneInput"
                  name="phone"
                  label={t("Phone number")}
                  error={this.state.validationErrors.phone}
                  onChange={this.onChange}
                />
                <Input
                  id="passwordInput"
                  name="password"
                  label={t("Password")}
                  type="password"
                  error={this.state.validationErrors.password}
                  onChange={this.onChange}
                />
                <Input
                  id="passwordRepeatInput"
                  name="passwordRepeat"
                  label={t("Password repeat")}
                  type="password"
                  error={this.state.validationErrors.passwordRepeat}
                  onChange={this.onChange}
                />
                <div className="text-center">
                  <Button
                    text="Sign Up"
                    pendingApiCall={pendingApiCall}
                    onClick={this.onClickSignUp}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const UserSignUpPageWithTranslation = withTranslation()(UserSignUpPage);
const UserSignUpPageWithApiProgress = withApiProgress(
  UserSignUpPageWithTranslation,
  "/api/1.0/users"
);
export default UserSignUpPageWithApiProgress;
