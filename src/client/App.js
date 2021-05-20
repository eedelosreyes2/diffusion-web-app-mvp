import React, { Component } from "react";
import "./app.css";
import ReactImage from "./react.png";
import DragAndDropComponent from "./components/DragAndDropComponent";
import LogInComponent from "./components/LogInComponent";

export default class App extends Component {
  state = { isLoggedIn: false, username: null, lists: null };

  componentDidMount() {
    if (this.isLoggedIn()) {
      this.setState({ isLoggedIn: true });
      this.fetchData();
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  isLoggedIn = () => {
    // fetch user logged in info from browser data

    // if logged in -> set username, return true

    // if not logged in -> return false

    return false;
  };

  fetchData = () => {
    fetch("/api/getUsername")
      .then((res) => res.json())
      .then((user) => this.setState({ username: user.username }));
    fetch("/api/getLists")
      .then((res) => res.json())
      .then((user) => this.setState({ username: user.username }));
  };

  render() {
    const { username } = this.state;
    return (
      <div>
        {/* {username ? (
          <h1>{`Hello ${username}`}</h1>
        ) : (
          <h1>Loading.. please wait!</h1>
        )}
        */}
        {this.state.isLoggedIn ? <DragAndDropComponent /> : <LogInComponent />}
      </div>
    );
  }
}
