export default function dishReducers(state = {
  
}, action) {
  switch (action.type) {
    case 'UPDATE_DISH':
      return Object.assign({}, state, { dish: action.dish });
      break;
    case 'UPDATE_DISH_LIST':
      return Object.assign({}, state, {dishList: action.dishList});
    default:
      return state;
  }
}
// should control state of dish lits
//should also control state of individual dishes
//update actions such as update name, title, 