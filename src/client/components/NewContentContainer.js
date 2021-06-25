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
	display: flex;
	flex-grow: 1;
`;

export default class NewContentContainer extends Component {
	render() {
		const content = this.props.board0.contentIds.map(
			(contentId) => this.props.content[contentId]
		);

		return (
			<Container>
				<Droppable
					droppableId="new-content-droppable"
					direction="horizontal"
				>
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
			</Container>
		);
	}
}
