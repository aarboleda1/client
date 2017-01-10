export default function chefPageViewReducer(state = [], action) {
	switch(action.type) {
	case 'MAKE_SELECTION':
		return [...state,
			Object.assign({}, action.course)
		];

	default:
		return state;
	}
} 