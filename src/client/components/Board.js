import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { colors } from '../../theme';
import Card from './Card';
import { IconContext } from 'react-icons/lib';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';

const Container = styled.div`
	background-color: ${(props) =>
		props.boardId === 'board0'
			? colors.primary
			: props.isDragging
			? 'lightblue'
			: 'white'};
	border: 2px solid ${colors.primary};
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	margin: 5px;
	padding: 0 5px 5px 5px;
	width 300px;
`;

const Handle = styled.div`
	background-color: ${colors.primary};
	border: 2px solid ${colors.primary};
	border-bottom-left-radius: 15px;
	border-bottom-right-radius: 15px;
	color: white;
	height: 0px;
	margin: auto;
	padding-bottom: 16px;
	position: absoulte;
	text-align: center;
	top: 0;
	width: 70%;
`;

const iconStyle = {
	// backgroundColor: 'red',
	top: 0,
};

const Title = styled.div`
	font-size: 24px;
	height: 50px;
	margin-top: 20px;
	text-align: center;
	width: 100%;
`;

const CardsContainer = styled.div`
	align-items: center;
	// background-color: ${(props) =>
		props.isDraggingOver ? 'grey' : 'white'};
	border-radius: 15px;
	display: flex;
	flex-direction: column;
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
							boardId={this.props.board.id}
							{...provided.draggableProps}
							ref={provided.innerRef}
							isDragging={snapshot.isDragging}
						>
							<Handle {...provided.dragHandleProps}>
								<IconContext.Provider
									value={{ style: iconStyle }}
								>
									<HiOutlineDotsHorizontal />
								</IconContext.Provider>
							</Handle>
							<Title isDragging={snapshot.isDragging}>
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
