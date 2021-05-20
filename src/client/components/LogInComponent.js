import React, { Component } from "react";
import GoogleLogin from "react-google-login";

export class LogInComponent extends Component {
  render() {
    return (
      <div>
        <GoogleLogin
          clientId="173875502237-vqno633dqovkrmnot06va4r1iu0m2882.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={this.props.responseGoogleLogin}
          onFailure={this.props.responseGoogleLogin}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    );
  }
}

export default LogInComponent;
