const data = {
	tasks: {
		'task-1': { id: 'task-1', content: 'Take out the garbage' },
		'task-2': { id: 'task-2', content: 'Watch my favorite show' },
		'task-3': { id: 'task-3', content: 'Charge my phone' },
		'task-4': { id: 'task-4', content: 'Cook dinner' },
	},
	columns: {
		'column-1': {
			id: 'column-1',
			title: 'To do',
			taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
		},
		'column-2': {
			id: 'column-2',
			title: 'In progress',
			taskIds: [],
		},
		'column-3': {
			id: 'column-3',
			title: 'Done',
			taskIds: [],
		},
	},
	// Facilitate reordering of the columns
	columnOrder: ['column-1', 'column-2', 'column-3'],
};

const data1 = {
	content: {
		'content-1': {
			id: 'content-1',
			url: 'youtube.com',
			quickThoughts: 'Logan was such a pussy during this fight ahaha.',
			category: 'Entertainment',
		},
		'content-2': {
			id: 'content-2',
			url: 'twitter.com',
			quickThoughts: 'This tweet is so me like omg.',
			category: 'Entertainment',
		},
		'content-3': {
			id: 'content-3',
			url: 'google.com',
			quickThoughts: 'Wow these are so sick dude.',
			category: 'Everyday Life',
		},
		'content-4': {
			id: 'content-4',
			url: 'zara.com',
			quickThoughts: 'These are the pants that I have always wanted.',
			category: 'Fashion',
		},
	},
	boards: {
		'board-1': {
			id: 'board-1',
			title: 'New Board',
			contentIds: ['content-1', 'content-2', 'content-3', 'content-4'],
		},
		'board-2': {
			id: 'board-2',
			title: 'First Board OMG',
			contentIds: [],
		},
		'board-3': {
			id: 'board-3',
			title: 'Best clothes ever bitch',
			contentIds: [],
		},
		'board-4': {
			id: 'board-4',
			title: 'Some great content  wow',
			contentIds: [],
		},
	},
	boardOrder: ['board-1', 'board-2', 'board-3', 'board-4'],
};

export default data;
