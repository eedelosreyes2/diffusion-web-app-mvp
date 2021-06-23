import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Header from './Header';
import Board from './Board';
import styled from 'styled-components';

const Container = styled.div`
	margin: 0 auto;
	width: 90%;
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
		const { destination, source, draggableId } = result;

		if (!destination) return;
		if (
			destination.droppableId === source.droppableId &&
			destination.index === source.index
		)
			return;

		const start = this.props.data.boards[source.droppableId];
		const finish = this.props.data.boards[destination.droppableId];

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
		console.log('OKOK');
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
					/>
					<DragDropContext onDragEnd={this.handleDragEnd}>
						<Container>
							<BoardsContainer className="hidden-scroll">
								{data.boardOrder.map((boardId) => {
									const board = data.boards[boardId];
									const content = board.contentIds.map(
										(contentId) => data.content[contentId]
									);
									return (
										<Board
											key={board.id}
											board={board}
											content={content}
										/>
									);
								})}
							</BoardsContainer>
						</Container>
					</DragDropContext>
				</>
			);
		}
		return <div></div>;
	}
}
