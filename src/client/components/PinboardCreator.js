import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Header from './Header';
import Board from './Board';
import styled from 'styled-components';

const Container = styled.div`
	margin: 0 auto;
	width: 85%;
`;

const BoardsContainer = styled.div`
	display: flex;
	justify-content: left;
	margin: 0 auto;
	overflow: auto;
	width: 100%;
`;

export default class PinboardCreator extends Component {
	handleDragEnd = (result) => {
		const { destination, source, draggableId, type } = result;

		// Invalid Drag
		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		// Dragging Boards
		if (type === 'board') {
			const newBoardOrder = Array.from(this.props.data.boardOrder);
			newBoardOrder.splice(source.index, 1);
			newBoardOrder.splice(destination.index, 0, draggableId);

			const newState = {
				...this.props,
				data: {
					...this.props.data,
					boardOrder: newBoardOrder,
				},
			};

			this.props.updateBoards(newState);
			return;
		}

		const start = this.props.data.boards[source.droppableId];
		const finish = this.props.data.boards[destination.droppableId];

		// If more than 5 in finish board, do not drop
		if (start !== finish && finish.contentIds.length > 5) {
			alert('You can only have up to 5 pieces of Content in a Board!');
			return;
		}

		// Dragging Content within Board
		if (start === finish) {
			const newContentIds = Array.from(start.contentIds);
			newContentIds.splice(source.index, 1);
			newContentIds.splice(destination.index, 0, draggableId);

			const newBoard = {
				...start,
				contentIds: newContentIds,
			};

			const newState = {
				...this.props,
				data: {
					...this.props.data,
					boards: {
						...this.props.data.boards,
						[newBoard.id]: newBoard,
					},
				},
			};

			this.props.updateBoards(newState);
			return;
		}

		// Dragging Content between Boards
		const startContentIds = Array.from(start.contentIds);
		startContentIds.splice(source.index, 1);
		const newStart = {
			...start,
			contentIds: startContentIds,
		};

		const finishContentIds = Array.from(finish.contentIds);
		finishContentIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			contentIds: finishContentIds,
		};

		const newState = {
			...this.props,
			data: {
				...this.props.data,
				boards: {
					...this.props.data.boards,
					[newStart.id]: newStart,
					[newFinish.id]: newFinish,
				},
			},
		};

		this.props.updateBoards(newState);
	};

	createBoard = () => {
		const title = prompt('What is the title of the board?');
		const id = uuidv4();
		const newBoard = {
			id,
			title,
			contentIds: [0],
		};
		const newBoardOrder = Array.from(this.props.data.boardOrder);
		newBoardOrder.splice(1, 0, id);

		const newState = {
			...this.props,
			data: {
				...this.props.data,
				boards: {
					...this.props.data.boards,
					[newBoard.id]: newBoard,
				},
				boardOrder: newBoardOrder,
			},
		};

		this.props.updateBoards(newState);
	};

	createContent = () => {
		console.log('Content');
	};

	render() {
		const { profileObj, data } = this.props;

		if (data) {
			return (
				<>
					<Header
						profileObj={profileObj}
						responseGoogleLogout={this.props.responseGoogleLogout}
						createBoard={this.createBoard}
						createContent={this.createContent}
					/>
					<DragDropContext onDragEnd={this.handleDragEnd}>
						<Droppable
							droppableId="boardsContainer"
							direction="horizontal"
							type="board"
						>
							{(provided, snapshot) => (
								<Container>
									<BoardsContainer
										className="hidden-scroll"
										ref={provided.innerRef}
										{...provided.innerRef}
										isDraggingOver={snapshot.isDraggingOver}
									>
										{data.boardOrder.map(
											(boardId, index) => {
												const board =
													data.boards[boardId];
												const content =
													board.contentIds.map(
														(contentId) =>
															data.content[
																contentId
															]
													);
												return (
													<Board
														index={index}
														key={board.id}
														board={board}
														content={content}
													/>
												);
											}
										)}
										{provided.placeholder}
									</BoardsContainer>
								</Container>
							)}
						</Droppable>
					</DragDropContext>
				</>
			);
		}
		return <div></div>;
	}
}
