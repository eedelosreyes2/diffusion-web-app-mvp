import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import styled from 'styled-components';
import { colors } from '../../theme';

const Container = styled.div`
	background-color: white;
	border: 2px solid ${colors.secondary};
	border-radius: 15px;
	height: 200px;
	margin: 0 auto 10px auto;
	width: 99%;
`;

const CardsContainer = styled.div`
	background-color: red;
	height: 100%;
	width: 100%;
`;

export default class NewContentContainer extends Component {
	render() {
		const { board0 } = this.props;
		const content = board0.contentIds.map(
			(contentId) => this.props.content[contentId]
		);

		console.log(content);

		return (
			<Container>
				<Droppable droppableId="new-content-container-droppable">
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
