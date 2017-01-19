export default function tokenReducer(state = null, action) {
  switch (action.type) {
    case 'SET_AUTHTOKEN':
      return action.token;
      break;
    case 'CLEAR_AUTHTOKEN':
      return null;
      break;
    default:
      return state;
  }
}
