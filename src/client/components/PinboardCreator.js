import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import Header from './Header';
import Board from './Board';
import styled from 'styled-components';
import { colors } from '../../theme';

const Container = styled.div`
	display: flex;
	height: 100vh;
`;

const NewContentContainer = styled.div`
	background-color: white;
	border-bottom: 2px solid ${colors.secondary};
	border-right: 2px solid ${colors.secondary};
	border-top: 2px solid ${colors.secondary};
	border-bottom-right-radius: 15px;
	border-top-right-radius: 15px;
	height: 99%;
	margin: auto 0;
	width: 600px;
`;

const HeaderAndBoardsContainer = styled.div`
	display: flex;
	flex-direction: column;
	overflow: auto;
`;

const BoardsContainer = styled.div`
	display: flex;
	justify-content: left;
	height: 600px;
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

			// Trying to reoder New Board
		}

		const start = this.props.data.boards[source.droppableId];
		const finish = this.props.data.boards[destination.droppableId];

		// If more than 5 in finish board, do not drop Content
		if (start !== finish && finish.contentIds.length > 5) {
			// alert('You can only have up to 5 pieces of Content in a Board!');
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

	deleteBoard = (boardId) => {
		console.log(boardId);
	};

	createContent = () => {
		const url = prompt('Enter the url: ');
		const quickThoughts = prompt('Enter Quick Thoughts: ');
		const category = prompt('Enter category: '); // this would be from a dropdownlist
		const id = uuidv4();
		const newCard = {
			id,
			url,
			quickThoughts,
			category,
		};
		const content = {
			...this.props.data.content,
			[newCard.id]: newCard,
		};
		const board0 = {
			...this.props.data.boards.board0,
			contentIds: [...this.props.data.boards.board0.contentIds, id],
		};
		const boards = {
			...this.props.data.boards,
			board0,
		};
		const newState = {
			...this.props,
			data: {
				...this.props.data,
				content,
				boards,
			},
		};
		this.props.updateBoards(newState);
	};

	render() {
		const { profileObj, data } = this.props;

		if (data) {
			return (
				<>
					{/* <Header
						profileObj={profileObj}
						responseGoogleLogout={this.props.responseGoogleLogout}
						createBoard={this.createBoard}
						createContent={this.createContent}
					/> */}
					<DragDropContext onDragEnd={this.handleDragEnd}>
						<Droppable
							droppableId="boardsContainer"
							direction="horizontal"
							type="board"
						>
							{(provided) => (
								<Container>
									<NewContentContainer></NewContentContainer>
									<HeaderAndBoardsContainer>
										<Header
											profileObj={profileObj}
											responseGoogleLogout={
												this.props.responseGoogleLogout
											}
											createBoard={this.createBoard}
											createContent={this.createContent}
										/>
										<BoardsContainer
											className="hidden-scroll"
											ref={provided.innerRef}
											{...provided.innerRef}
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
															deleteBoard={
																this.deleteBoard
															}
														/>
													);
												}
											)}
											{provided.placeholder}
										</BoardsContainer>
									</HeaderAndBoardsContainer>
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
