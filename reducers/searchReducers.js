export default function searchReducers(state = {}, action) {
  switch (action.type) {
    case 'SET_SEARCH_CUISINE':
      return Object.assign({}, state, { cuisine: action.cuisine });
      break;
    case 'SET_SEARCH_LOCATION':
      return Object.assign({}, state, { location: action.location });
      break;
    case 'TOGGLE_SEARCH_RESTRICTION':
      {
        let update = {};
        update[action.restriction] = !state.restrictions[action.restriction];
        let newRestrictions = Object.assign({}, state.restrictions, update);
        return Object.assign({}, state, {restrictions: newRestrictions});
      }
      break;
    case 'TOGGLE_SEARCH_PRICE':
      {
        let update = {};
        update[action.price] = !state.prices[action.price];

        let newPrices = Object.assign({}, state.prices, update);
        return Object.assign({}, state, {prices: newPrices});
      }
      break;
    case 'CLEAR_SEARCH_CUISINE':
      return Object.assign({}, state, { cuisine: null });
      break;
    case 'CLEAR_SEARCH_LOCATION':
      return Object.assign({}, state, { location: null });
      break;
    case 'CLEAR_SEARCH_RESTRICTIONS':
      return Object.assign({}, state, { restrictions: {} });
      break;
    case 'CLEAR_SEARCH_PRICES':
      return Object.assign({}, state, { prices: {} });
      break;
    default:
      return state;
  }
}
