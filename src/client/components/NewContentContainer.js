import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import styled from 'styled-components';
import { colors } from '../../theme';

const Container = styled.div`
	align-items: center;
	background-color: white;
	border: 2px solid ${colors.secondary};
	border-radius: 15px;
	display: flex;
	margin: 0 auto 10px auto;
	padding: 10px 5px;
	width: 99%;
`;

const CardsContainer = styled.div`
	background-color: purple;
	display: flex;
`;

const TrashContainer = styled.div`
	background-color: red;
	height: 100%;
	width: 400px;
`;

export default class NewContentContainer extends Component {
	render() {
		let content = [];
		if (this.props.content) {
			this.props.board0.contentIds.map(
				(contentId) => this.props.content[contentId]
			);
		}

		return (
			<Container>
				<Droppable droppableId="new-content" direction="horizontal">
					{(provided) => {
						return (
							<CardsContainer
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
					{(provided) => {
						return (
							<TrashContainer
								ref={provided.innerRef}
								{...provided.innerRef}
							/>
						);
					}}
				</Droppable>
			</Container>
		);
	}
}
