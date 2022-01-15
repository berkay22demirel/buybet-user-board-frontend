import "./App.css";
import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import UserSignInPage from "./pages/UserSignInPage";
import UserSignUpPage from "./pages/UserSignUpPage";
import UserPage from "./pages/UserPage";
import { useSelector } from "react-redux";
import React from "react";

const App = () => {
  const { isLoggedIn } = useSelector((store) => {
    return {
      isLoggedIn: store.isLoggedIn,
    };
  });
  return (
    <div className="App">
      <HashRouter>
        <Navbar />
        <Switch>
          <Route exact path="/" component={HomePage} />
          {!isLoggedIn && <Route path="/signin" component={UserSignInPage} />}
          <Route path="/signup" component={UserSignUpPage} />
          <Route path="/user/:username" component={UserPage} />
          <Redirect to="/" />
        </Switch>
        <Footer />
      </HashRouter>
    </div>
  );
};

export default App;
