import React, { Component } from 'react';
import axios from 'axios';
import DragAndDropComponent from './components/DragAndDropComponent';
import PinboardCreator from './components/PinboardCreator';
import LogInComponent from './components/LogInComponent';
import LogOutComponent from './components/LogOutComponent';
import './app.css';
import data from '../data';

export default class App extends Component {
	state = { data, profileObj: null, username: '', boards: null };

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
			this.fetchBoads();
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
			this.fetchBoads();
		}
	};

	responseGoogleLogout = (response) => {
		this.setState({ profileObj: null });
	};

	fetchBoads = async () => {
		let url = 'https://diffusion-web-app-mvp-default-rtdb.firebaseio.com/';
		url += this.state.username + '/boards.json';

		axios
			.get(url)
			.then((res) => {
				const boards = res.data;
				if (boards) {
					this.setState({ boards });
				}
			})
			.catch((err) => console.log(err));
	};

	render() {
		const { profileObj, boards } = this.state;

		// console.log(this.state);

		return (
			<>
				{profileObj ? (
					<>
						<h1>{`Hello ${profileObj.givenName} ${profileObj.familyName}!`}</h1>
						<div>
							<div style={{ overflow: 'scroll' }}>
								{/* <DragAndDropComponent boards={boards} /> */}
								<PinboardCreator data={data} />
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
