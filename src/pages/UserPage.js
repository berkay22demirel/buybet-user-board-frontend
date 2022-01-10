import React, { Component } from "react";
import { connect } from "react-redux";

class UserPage extends Component {
  render() {
    const pathUsername = this.props.match.params.username;
    let message = "we connot edit";
    if (pathUsername === this.props.loggedInUsername) {
      message = "we can edit";
    }
    return (
      <div className="container">
        <h1>User Page</h1>
        <div>{message}</div>
      </div>
    );
  }
}

const mapStateToProps = (store) => {
  return {
    loggedInUsername: store.username,
  };
};

export default connect(mapStateToProps)(UserPage);
