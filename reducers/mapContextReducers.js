export default function mapContextReducer(state=null, action) {
  switch (action.type) {
    case 'SET_MAP_CONTEXT':
      return action.context;
      break;
    case 'CLEAR_MAP_CONTEXT':
      return null;
      break;
    default:
      return state;
  }
}
