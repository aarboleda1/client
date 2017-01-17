export default function chefReducers(state={}, action) {
  switch (action.type) {
    case 'SET_CHEF_LOCATION':
      return Object.assign({}, state, { location: action.location });
      break;
    case 'CLEAR_CHEF_LOCATION':
      return Object.assign({}, state, { location: null });
      break;
    default:
      return state;
  }
}
