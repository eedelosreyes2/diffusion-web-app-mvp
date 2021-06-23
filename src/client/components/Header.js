import React, { Component } from 'react';
import styled from 'styled-components';
import { colors } from '../../theme';

const Container = styled.div`
	display: flex;
	height: 100px;
	justify-content: space-around;
	width: 100%;
`;

const H1 = styled.h1`
	color: #00b1d2;
	margin: auto;
`;

const ButtonsContainer = styled.div`
	display: flex;
	margin: auto;
	width: 300px;
`;

const Button = styled.div`
	background-color: ${(props) =>
		props.type === 'create' ? colors.green : colors.secondary};
	border-radius: 15px;
	height: 40px;
	margin-left: 30px;
	width: 90px;
`;

export default class Header extends Component {
	render() {
		const { givenName, familyName } = this.props.profileObj;

		return (
			<Container>
				<ButtonsContainer></ButtonsContainer>
				<H1>{`Hello ${givenName} ${familyName}!`}</H1>
				<ButtonsContainer>
					<Button type="create" onClick={this.props.createBoard}>
						Create Board
					</Button>
					<Button onClick={this.props.createBoard}>Edit Baord</Button>
				</ButtonsContainer>
			</Container>
		);
	}
}
