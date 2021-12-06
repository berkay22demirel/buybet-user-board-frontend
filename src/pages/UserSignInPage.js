import React, { Component } from "react";
import { signIn } from "../api/userApiCalls";
import Input from "../components/Input";
import { withTranslation } from "react-i18next";
import Button from "../components/Button";
import axios from "axios";

class UserSignInPage extends Component {
  state = {
    username: null,
    password: null,
    pendingApiCall: false,
    error: null,
  };

  componentDidMount() {
    axios.interceptors.request.use((request) => {
      this.setState({
        pendingApiCall: true,
      });
      return request;
    });
    axios.interceptors.response.use(
      (response) => {
        this.setState({
          pendingApiCall: false,
        });
        return response;
      },
      (error) => {
        this.setState({
          pendingApiCall: false,
        });
        throw error;
      }
    );
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      error: null,
    });
  };

  onClickSignIn = async (event) => {
    event.preventDefault();
    const login = {
      username: this.state.username,
      password: this.state.password,
    };
    this.setState({
      error: null,
    });
    try {
      await signIn(login);
    } catch (apiError) {
      console.log(apiError);
      this.setState({
        error: apiError.response.data.errorMessage,
      });
    }
  };

  render() {
    const { t } = this.props;
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
                  onChange={this.onChange}
                />
                <Input
                  id="passwordInput"
                  name="password"
                  label={t("Password")}
                  type="password"
                  onChange={this.onChange}
                />
                {this.state.error && (
                  <div className="alert alert-danger">{this.state.error}</div>
                )}
                <div className="text-center">
                  <Button
                    text="Sign In"
                    pendingApiCall={this.state.pendingApiCall}
                    onClick={this.onClickSignIn}
                  ></Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withTranslation()(UserSignInPage);
