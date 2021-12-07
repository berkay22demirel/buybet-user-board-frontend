import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./bootstrap-override.scss";
import UserSignUpPage from "./pages/UserSignUpPage";
import UserSignInPage from "./pages/UserSignInPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import reportWebVitals from "./reportWebVitals";
import "./i18n";

ReactDOM.render(
  <React.StrictMode>
    <Navbar />
    <UserSignUpPage />
    <Footer />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
