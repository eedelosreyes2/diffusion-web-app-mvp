import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from './Board';

export default class PinboardCreator extends Component {
	handleDragEnd = (result) => {
		// TODO: Reorder column
	};

	render() {
		const { data } = this.props;

		if (data) {
			return (
				<DragDropContext onDragEnd={this.handleDragEnd}>
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
					;
				</DragDropContext>
			);
		}
		return <div></div>;
	}
}
