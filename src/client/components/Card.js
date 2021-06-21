import React, { Component } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import { colors } from '../../theme';

const Container = styled.div`
	background-color: ${(props) => (props.isDragging ? 'lightblue' : ' white')};
	border: 1px solid lightgrey;
	border-radius: 5px;
	margin-bottom: 10px;
	min-height: 50px;
`;

const Url = styled.div`
	padding: 10px;
`;

const QuickThoughts = styled.div`
	padding: 10px;
`;

const Category = styled.div`
	font-size: 12px;
	padding: 10px;
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
							<Url>{this.props.content.url}</Url>
							<QuickThoughts>
								{this.props.content.quickThoughts}
							</QuickThoughts>
							<Category>{this.props.content.category}</Category>
						</Container>
					);
				}}
			</Draggable>
		);
	}
}

export default Card;
