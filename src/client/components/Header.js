import React, { Component } from 'react';
import LogOutComponent from './LogOutComponent';
import styled from 'styled-components';

const Container = styled.div`
	display: flex;
	height: 100px;
	width: 100%;
`;

const H1 = styled.h1`
	color: #00b1d2;
	margin: auto;
`;

export default class Header extends Component {
	render() {
		const { givenName, familyName } = this.props.profileObj;

		return (
			<Container>
				<H1>{`Hello ${givenName} ${familyName}!`}</H1>
			</Container>
		);
	}
}
