import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import styled from 'styled-components';
import { colors } from '../../theme';

const Container = styled.div`
	align-items: center;
	background-color: white;
	// border: 2px solid black;
	// border-radius: 15px;
	// border-bottom: 2px solid ${colors.secondary};
	display: flex;
	justify-content: space-between;
	margin: 0 auto 10px auto;
	padding: 10px 5px;
	width: 99%;
`;

const CardsContainer = styled.div`
	display: flex;
	flex-grow: 1;
	min-height: 100px;
	overflow: auto;
`;

const TrashContainer = styled.div`
	background-color: ${(props) => (props.isDraggingOver ? 'red' : 'white')};
	border: 2px solid red;
	border-radius: 15px;
	// height: 100%;
	margin: 0 5px;
	min-height: 100px;
	width: 200px;
`;

export default class NewContentContainer extends Component {
	render() {
		let content = [];
		if (this.props.content) {
			content = this.props.board0.contentIds.map(
				(contentId) => this.props.content[contentId]
			);
		}

		return (
			<Container>
				<Droppable droppableId="board0" direction="horizontal">
					{(provided) => {
						return (
							<CardsContainer
								className="hidden-scroll"
								ref={provided.innerRef}
								{...provided.innerRef}
							>
								{content.map((content, index) => {
									return content ? (
										<Card
											key={content.id}
											content={content}
											index={index}
										/>
									) : (
										''
									);
								})}
								{provided.placeholder}
							</CardsContainer>
						);
					}}
				</Droppable>
				<Droppable droppableId="trash">
					{(provided, snapshot) => {
						return (
							<TrashContainer
								ref={provided.innerRef}
								{...provided.innerRef}
								isDraggingOver={snapshot.isDraggingOver}
							/>
						);
					}}
				</Droppable>
			</Container>
		);
	}
}
