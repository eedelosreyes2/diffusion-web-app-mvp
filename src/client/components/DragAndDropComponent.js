import React, { useState, useEffect } from 'react';

export default function DragAndDropComponent(props) {
	const [boards, setBoards] = useState(props);

	console.log(boards);

	useEffect(() => {
		setBoards(props);
	}, [props]);

	function onDragEnd(result, boards, setBoards) {
		if (!result.destination) return;
		const { source, destination } = result;

		// if (source.droppableId !== destination.droppableId) {
		// 	const sourceColumn = columns[source.droppableId];
		// 	const destColumn = columns[destination.droppableId];
		// 	const sourceItems = [...sourceColumn.items];
		// 	const destItems = [...destColumn.items];
		// 	const [removed] = sourceItems.splice(source.index, 1);
		// 	destItems.splice(destination.index, 0, removed);
		// 	setColumns({
		// 		...columns,
		// 		[source.droppableId]: {
		// 			...sourceColumn,
		// 			items: sourceItems,
		// 		},
		// 		[destination.droppableId]: {
		// 			...destColumn,
		// 			items: destItems,
		// 		},
		// 	});
		// } else {
		// 	const column = columns[source.droppableId];
		// 	const copiedItems = [...column.items];
		// 	const [removed] = copiedItems.splice(source.index, 1);
		// 	copiedItems.splice(destination.index, 0, removed);
		// 	setColumns({
		// 		...columns,
		// 		[source.droppableId]: {
		// 			...column,
		// 			items: copiedItems,
		// 		},
		// 	});
		// }
	}

	return (
		<div
			style={{ display: 'flex', justifyContent: 'left', height: '100%' }}
		>
			{/* <DragAndDropComponent
				onDragEnd={(result) => onDragEnd(result, boards, setBoards)}
			>
				{Object.entries(boards).map((board, index) => {
					return (
						<div>
							{board} {index}
						</div>
					);
				})}
			</DragAndDropComponent> */}
		</div>
	);
}
