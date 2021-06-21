import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';

const Footer = styled.div`
	bottom: 0;
	left: 0;
	right: 0;
	position: absolute;
`;

const Button = styled.div`
	background-color: ${colors.secondary};
	border-radius: 15px;
	cursor: pointer;
	height: 50px;
	padding: auto;
	text-align: center;
	width: 200px;
`;

const Label = styled.h3``;

export class LogOutComponent extends Component {
	render() {
		return (
			<Footer>
				<Button
					style={{ display: 'block', margin: '30px auto' }}
					onClick={this.props.responseGoogleLogout}
				>
					<Label>Logout</Label>
				</Button>
			</Footer>
		);
	}
}

export default LogOutComponent;
