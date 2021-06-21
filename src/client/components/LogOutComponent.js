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
					buttonText="Logout"
					onLogoutSuccess={this.props.responseGoogleLogout}
					onFailure={this.props.responseGoogleLogout}
				/>
			</Footer>
		);
	}
}

export default LogOutComponent;
