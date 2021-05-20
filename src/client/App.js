import React, { Component } from "react";
import "./app.css";
import DragAndDropComponent from "./components/DragAndDropComponent";
import LogInComponent from "./components/LogInComponent";
import LogOutComponent from "./components/LogOutComponent";

export default class App extends Component {
  state = { profileObj: null, lists: null };

  componentDidMount = () => {
    this.getProfileObj();
    window.addEventListener("load", this.getProfileObj);
    window.addEventListener("beforeunload", this.setProfileObj);
  };

  componentWillUnmount = () => {
    this.setProfileObj();
    window.removeEventListener("load", this.getProfileObj);
    window.removeEventListener("beforeunload", this.setProfileObj);
  };

  getProfileObj = () => {
    const profileObj = JSON.parse(sessionStorage.getItem("profileObj"));
    if (profileObj) this.setState({ profileObj });
  };

  setProfileObj = () => {
    sessionStorage.setItem("profileObj", JSON.stringify(this.state.profileObj));
  };

  responseGoogleLogin = (response) => {
    console.log(response);
    console.log(response.profileObj);

    if (response.profileObj) {
      const profileObj = response.profileObj;
      const email = profileObj.email;
      this.setState({ profileObj });
      this.fetchData(email);
    }
  };

  responseGoogleLogout = (response) => {
    this.setState({ profileObj: null });
  };

  fetchData = (email) => {
    // fetch("/api/getUsername")
    //   .then((res) => res.json())
    //   .then((user) => this.setState({ username: user.username }));
    // fetch("/api/getLists")
    //   .then((res) => res.json())
    //   .then((lists) => this.setState({ lists }));
    console.log("fetched data for " + email);
  };

  render() {
    const profileObj = this.state.profileObj;

    return (
      <div>
        {profileObj ? (
          <h1>{`Hello ${profileObj.givenName} ${profileObj.familyName}!`}</h1>
        ) : (
          <h1>Please login!</h1>
        )}

        {this.state.profileObj ? (
          <div>
            <DragAndDropComponent />
            <LogOutComponent responseGoogleLogout={this.responseGoogleLogout} />
          </div>
        ) : (
          <LogInComponent responseGoogleLogin={this.responseGoogleLogin} />
        )}
      </div>
    );
  }
}
