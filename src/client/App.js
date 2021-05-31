import React, { Component } from "react";
import axios from "axios";
import DragAndDropComponent from "./components/DragAndDropComponent";
import LogInComponent from "./components/LogInComponent";
import LogOutComponent from "./components/LogOutComponent";
import "./app.css";

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
    if (profileObj) {
      this.setState({ profileObj });
      this.fetchData(profileObj.email);
    }
  };

  setProfileObj = () => {
    sessionStorage.setItem("profileObj", JSON.stringify(this.state.profileObj));
  };

  responseGoogleLogin = (response) => {
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

  fetchData = async (email) => {
    axios.get("/api/getLists").then((res) => {
      const { lists } = res.data;
      this.setState({ lists });
    });
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
            <DragAndDropComponent lists={this.state.lists} />
            <LogOutComponent responseGoogleLogout={this.responseGoogleLogout} />
          </div>
        ) : (
          <LogInComponent responseGoogleLogin={this.responseGoogleLogin} />
        )}
      </div>
    );
  }
}
