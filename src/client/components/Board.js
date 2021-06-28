import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { colors } from '../../theme';
import Card from './Card';
import { IconContext } from 'react-icons/lib';
import { HiOutlineDotsHorizontal } from 'react-icons/hi';
import { FiEdit2, FiTrash } from 'react-icons/fi';
import { BsArrowClockwise } from 'react-icons/bs';

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
	position: relative;
`;

const Handle = styled.div`
	background-color: ${colors.primary};
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
	top: 0,
};

const Title = styled.div`
	font-size: 24px;
	margin-top: 10px;
	text-align: center;
	width: 100%;
`;

const CardsContainer = styled.div`
	border-radius: 15px;
	display: flex;
	flex-direction: column;
	height: 100%;
	margin: 5px auto;
`;

const Footer = styled.div`
	align-items: center;
	bottom: 0;
	color: 'black';
	display: flex;
	flex-direction: row;
	height: 35px;
	justify-content: space-evenly;
	left: 0,
	position: absolute;
	right: 0;
`;

export class Board extends Component {
	render() {
		const { id, title } = this.props.board;

		return (
			<Draggable draggableId={id} index={this.props.index}>
				{(provided, snapshot) => {
					return (
						<Container
							boardId={id}
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
							<Title>{title}</Title>
							<Droppable droppableId={id}>
								{(provided) => {
									return (
										<CardsContainer
											ref={provided.innerRef}
											{...provided.droppableProps}
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
							<Footer boardId={id}>
								<IconContext.Provider
									value={{ style: { cursor: 'pointer' } }}
								>
									<FiEdit2 />
								</IconContext.Provider>
								<IconContext.Provider
									value={{
										size: '2em',
										style: { cursor: 'pointer' },
									}}
								>
									<BsArrowClockwise />
								</IconContext.Provider>
								<IconContext.Provider
									value={{ style: { cursor: 'pointer' } }}
								>
									<FiTrash
										onClick={() =>
											this.props.deleteBoard(id, title)
										}
									/>
								</IconContext.Provider>
							</Footer>
						</Container>
					);
				}}
			</Draggable>
		);
	}
}

export default Board;
