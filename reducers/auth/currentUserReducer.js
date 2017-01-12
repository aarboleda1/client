export default function currentUserReducer(state = null, action) {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return action.id;
      break;
    case 'CLEAR_CURRENT_USER':
      return null
      break;
    default:
      return state;
  }
}
