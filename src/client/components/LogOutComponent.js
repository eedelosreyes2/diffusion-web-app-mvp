import React, { Component } from "react";
import GoogleLogout from "react-google-login";

export class LogOutComponent extends Component {
  render() {
    return <button onClick={this.props.responseGoogleLogout}>Logout</button>;
  }
}

export default LogOutComponent;
