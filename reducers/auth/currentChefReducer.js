export default function currentChefReducer(state=null, action) {
  switch (action.type) {
    case 'SET_CURRENT_CHEF':
      return action.id;
      break;
    case 'CLEAR_CURRENT_CHEF':
      return null;
      break;
    default:
      return state;
  }
}
