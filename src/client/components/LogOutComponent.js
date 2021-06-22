import React, { Component } from 'react';
import { GoogleLogout } from 'react-google-login';
import styled from 'styled-components';

const Footer = styled.div`
	bottom: 20px;
	left: 0;
	right: 0;
	position: absolute;
	text-align: center;
`;

export class LogOutComponent extends Component {
	render() {
		return (
			<Footer>
				<GoogleLogout
					clientId="173875502237-vqno633dqovkrmnot06va4r1iu0m2882.apps.googleusercontent.com"
					buttonText="Logout"
					onLogoutSuccess={this.props.responseGoogleLogout}
					onFailure={this.props.responseGoogleLogout}
				/>
			</Footer>
		);
	}
}

export default LogOutComponent;
