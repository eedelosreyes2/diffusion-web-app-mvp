import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Board from './Board';

const Container = styled.div`
	display: flex;
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

		const start = this.props.data.columns[source.droppableId];
		const finish = this.props.data.columns[destination.droppableId];

		if (start === finish) {
			const newTaskIds = Array.from(start.taskIds);
			newTaskIds.splice(source.index, 1);
			newTaskIds.splice(destination.index, 0, draggableId);

			const newColumn = {
				...start,
				taskIds: newTaskIds,
			};

			const newState = {
				...this.props,
				data: {
					...this.props.data,
					columns: {
						...this.props.data.columns,
						[newColumn.id]: newColumn,
					},
				},
			};

			this.props.updateBoards(newState);
			return;
		}

		const startTaskIds = Array.from(start.taskIds);
		startTaskIds.splice(source.index, 1);
		const newStart = {
			...start,
			taskIds: startTaskIds,
		};

		const finishTaskIds = Array.from(finish.taskIds);
		finishTaskIds.splice(destination.index, 0, draggableId);
		const newFinish = {
			...finish,
			taskIds: finishTaskIds,
		};

		const newState = {
			...this.props,
			data: {
				...this.props.data,
				columns: {
					...this.props.data.columns,
					[newStart.id]: newStart,
					[newFinish.id]: newFinish,
				},
			},
		};

		this.props.updateBoards(newState);
	};

	render() {
		const { data } = this.props;

		console.log(data);

		if (data) {
			return (
				<DragDropContext onDragEnd={this.handleDragEnd}>
					<Container>
						{data.columnOrder.map((columnId) => {
							const column = data.columns[columnId];
							const tasks = column.taskIds.map(
								(taskId) => data.tasks[taskId]
							);
							return (
								<Board
									key={column.id}
									column={column}
									tasks={tasks}
								/>
							);
						})}
					</Container>
				</DragDropContext>
			);
		}
		return <div></div>;
	}
}
