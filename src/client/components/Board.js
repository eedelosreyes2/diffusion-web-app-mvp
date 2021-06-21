import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
	background-color: white;
	border: 2px solid #00b1d2;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	margin: 15px;
	width 300px;
`;

const Title = styled.div`
	font-size: 24px;
	height: 50px;
	padding: 15px 0;
	width: 100%;
`;

const CardsContainer = styled.div`
	// background-color: ${(props) =>
		props.isDraggingOver ? 'grey' : 'white'};
	border-radius: 15px;
	flex-grow: 1;
	margin: auto;
	padding-top: 10px;
	width: 100%;
`;

export class Board extends Component {
	render() {
		return (
			<Container>
				<Title>{this.props.board.title}</Title>
				<Droppable droppableId={this.props.board.id}>
					{(provided, snapshot) => {
						return (
							<CardsContainer
								ref={provided.innerRef}
								{...provided.droppableProps}
								isDraggingOver={snapshot.isDraggingOver}
							>
								{this.props.content.map((content, index) =>
									content ? (
										<Card
											key={content.id}
											content={content}
											index={index}
										/>
									) : (
										''
									)
								)}
								{provided.placeholder}
							</CardsContainer>
						);
					}}
				</Droppable>
			</Container>
		);
	}
}

export default Board;
