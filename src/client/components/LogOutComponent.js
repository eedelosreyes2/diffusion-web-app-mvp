import React, { Component } from "react";
import GoogleLogout from "react-google-login";

export class LogOutComponent extends Component {
  render() {
    return (
      <button
        style={{ display: "block", margin: "30px auto" }}
        onClick={this.props.responseGoogleLogout}
      >
        Logout
      </button>
    );
  }
}

export default LogOutComponent;
