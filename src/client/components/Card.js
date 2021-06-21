import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';

const Container = styled.div`
	background-color: ${(props) => (props.isDragging ? 'lightblue' : ' white')};
	border: 1px solid lightgrey;
	border-radius: 2px;
	margin-bottom: 10px;
	min-height: 50px;
`;

export class Card extends Component {
	render() {
		return (
			<Draggable
				draggableId={this.props.content.id}
				index={this.props.index}
			>
				{(provided, snapshot) => {
					return (
						<Container
							{...provided.draggableProps}
							{...provided.dragHandleProps}
							ref={provided.innerRef}
							isDragging={snapshot.isDragging}
						>
							{this.props.content.url}
							{this.props.content.quickThoughts}
							{this.props.content.category}
						</Container>
					);
				}}
			</Draggable>
		);
	}
}

export default Card;
