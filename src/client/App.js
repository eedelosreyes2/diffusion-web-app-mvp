import React, { Component } from 'react';
import axios from 'axios';
import PinboardCreator from './components/PinboardCreator';
import LogInComponent from './components/LogInComponent';
import LogOutComponent from './components/LogOutComponent';
import './app.css';

export default class App extends Component {
	state = { profileObj: null, username: null, data: null };

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

	componentDidUpdate(prevProps, prevState) {
		if (this.state !== prevState) {
			this.putBoards();
		}
	}

	getCache = () => {
		const state = JSON.parse(sessionStorage.getItem('state'));
		if (state) {
			this.setState(state);
			this.fetchBoads();
		}
	};

	setCache = () => {
		sessionStorage.setItem('state', JSON.stringify(this.state));
		this.putBoards();
	};

	fetchBoads = async () => {
		let url =
			'https://diffusion-web-app-mvp-default-rtdb.firebaseio.com/' +
			this.state.username +
			'/data.json';

		axios
			.get(url)
			.then((res) => {
				const { data } = res;
				if (data) {
					this.setState({ data });
				}
			})
			.catch((err) => console.log(err));
	};

	putBoards = async () => {
		let url =
			'https://diffusion-web-app-mvp-default-rtdb.firebaseio.com/' +
			this.state.username +
			'/data.json';
		const { data } = this.state;

		axios.put(url, data, { headers: { 'Content-Type': 'text/plain' } });
	};

	updateBoards = (newState) => {
		this.setState(newState);
	};

	responseGoogleLogin = (response) => {
		if (response.profileObj) {
			const profileObj = response.profileObj;
			const email = profileObj.email;
			const username = email.replace(/[^a-zA-Z0-9 ]/g, '');
			this.setState({ username });
			this.setState({ profileObj });
			this.fetchBoads();
		}
	};

	responseGoogleLogout = (response) => {
		this.setState({ profileObj: null });
	};

	render() {
		const { data, profileObj } = this.state;

		// console.log(this.state);

		return (
			<>
				{profileObj ? (
					<>
						<h1>{`Hello ${profileObj.givenName} ${profileObj.familyName}!`}</h1>
						<div>
							<div style={{ overflow: 'scroll' }}>
								<PinboardCreator
									data={data}
									updateBoards={this.updateBoards}
								/>
							</div>
							<LogOutComponent
								responseGoogleLogout={this.responseGoogleLogout}
							/>
						</div>
					</>
				) : (
					<>
						<h1>Please login!</h1>
						<LogInComponent
							responseGoogleLogin={this.responseGoogleLogin}
						/>
					</>
				)}
			</>
		);
	}
}
