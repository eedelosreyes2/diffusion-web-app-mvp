import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Card from './Card';

const Container = styled.div`
	background-color: ${(props) => (props.isDragging ? 'lightblue' : 'white')};
	border: 2px solid #00b1d2;
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	margin: 15px;
	padding: 0 5px;
	width 300px;
`;

const Title = styled.div`
	font-size: 24px;
	height: 50px;
	margin-top: 20px;
	text-align: center;
	width: 100%;
`;

const CardsContainer = styled.div`
	// background-color: ${(props) =>
		props.isDraggingOver ? 'grey' : 'white'};
	border-radius: 15px;
	flex-grow: 1;
	margin: auto;
	width: 100%;
`;

export class Board extends Component {
	render() {
		return (
			<Draggable
				draggableId={this.props.board.id}
				index={this.props.index}
			>
				{(provided, snapshot) => {
					return (
						<Container
							{...provided.draggableProps}
							ref={provided.innerRef}
							isDragging={snapshot.isDragging}
						>
							<Title
								{...provided.dragHandleProps}
								isDragging={snapshot.isDragging}
							>
								{this.props.board.title}
							</Title>
							<Droppable droppableId={this.props.board.id}>
								{(provided, snapshot) => {
									return (
										<CardsContainer
											ref={provided.innerRef}
											{...provided.droppableProps}
											isDraggingOver={
												snapshot.isDraggingOver
											}
										>
											{this.props.content.map(
												(content, index) =>
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
				}}
			</Draggable>
		);
	}
}

export default Board;
