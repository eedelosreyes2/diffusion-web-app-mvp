import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
	background-color: white;
	border: 1px solid lightgrey;
	border-radius: 2px;
	margin-bottom: 10px;
	min-height: 50px;
	padding: 5px auto;
	width: 100%;
`;

export class Card extends Component {
	render() {
		return (
			<Draggable
				draggableId={this.props.task.id}
				index={this.props.index}
			>
				{(provided) => {
					return (
						<Container
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
						>
							{this.props.task.content}
						</Container>
					);
				}}
			</Draggable>
		);
	}
}

export default Card;
