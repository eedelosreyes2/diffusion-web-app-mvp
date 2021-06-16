import React, { Component } from 'react';
import axios from 'axios';
import DragAndDropComponent from './components/DragAndDropComponent';
import LogInComponent from './components/LogInComponent';
import LogOutComponent from './components/LogOutComponent';
import './app.css';

export default class App extends Component {
	state = { profileObj: null, username: '', newList: null, lists: null };

	componentDidMount = () => {
		this.getCache();
		window.addEventListener('load', this.getCache);
		window.addEventListener('beforeunload', this.setCache);
	};

	componentWillUnmount = () => {
		this.setCache();
		window.removeEventListener('load', this.getCache);
		window.removeEventListener('beforeunload', this.setCache);
	};

	getCache = () => {
		const state = JSON.parse(sessionStorage.getItem('state'));
		if (state) {
			this.setState(state);
			this.getNewList();
		}
	};

	setCache = () => {
		sessionStorage.setItem('state', JSON.stringify(this.state));
	};

	responseGoogleLogin = (response) => {
		if (response.profileObj) {
			const profileObj = response.profileObj;
			const email = profileObj.email;
			const username = email.replace(/[^a-zA-Z0-9 ]/g, '');
			this.setState({ username });
			this.setState({ profileObj });
			this.getNewList();
		}
	};

	responseGoogleLogout = (response) => {
		this.setState({ profileObj: null });
	};

	getNewList = async () => {
		let url = 'https://diffusion-web-app-mvp-default-rtdb.firebaseio.com/';
		url += this.state.username + '/newList.json';

		axios
			.get(url)
			.then((res) => {
				const { newList } = res.data;
				if (newList) {
					this.setState({ newList });
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		const profileObj = this.state.profileObj;

		console.log(this.state.newList);

		return (
			<div>
				{profileObj ? (
					<h1>{`Hello ${profileObj.givenName} ${profileObj.familyName}!`}</h1>
				) : (
					<h1>Please login!</h1>
				)}

				{this.state.profileObj ? (
					<div>
						<div style={{ overflow: 'scroll' }}>
							<DragAndDropComponent lists={this.state.lists} />
						</div>
						<LogOutComponent
							responseGoogleLogout={this.responseGoogleLogout}
						/>
					</div>
				) : (
					<LogInComponent
						responseGoogleLogin={this.responseGoogleLogin}
					/>
				)}
			</div>
		);
	}
}
