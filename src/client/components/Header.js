import React, { Component } from 'react';
import LogOutComponent from './LogOutComponent';
import styled from 'styled-components';
import { colors } from '../../theme';

const Container = styled.div`
	display: flex;
	height: 10vh;
	// justify-content: space-between;
	margin: 0 auto;
	width: 99%;
`;

const H1 = styled.h1`
	color: #00b1d2;
	margin: auto;
	text-align: center;
	width: 50%;
`;

const ButtonsContainer = styled.div`
	display: flex;
	justify-content: ${(props) =>
		props.type === 'logout' ? 'flex-end' : 'flex-start'};
	margin: auto;
	width: 25%;
`;

const Button = styled.div`
	background-color: ${(props) =>
		props.type === 'board' ? colors.primary : colors.secondary};
	border-radius: 15px;
	cursor: pointer;
	font-weight: bold;
	height: 35px;
	margin-right: 10px;
	padding: 15px 15px 0 15px;
	text-align: center;
`;

export default class Header extends Component {
	render() {
		const { givenName, familyName } = this.props.profileObj;

		return (
			<Container>
				<ButtonsContainer>
					<Button type="board" onClick={this.props.createBoard}>
						+Board
					</Button>
					<Button type="content" onClick={this.props.createContent}>
						+Content
					</Button>
				</ButtonsContainer>
				<H1>{`Hello ${givenName} ${familyName}!`}</H1>
				<ButtonsContainer type="logout">
					<LogOutComponent
						responseGoogleLogout={this.props.responseGoogleLogout}
					/>
				</ButtonsContainer>
			</Container>
		);
	}
}
