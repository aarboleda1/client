export default function dishReducers(state = {
  dishList: [{
    name: 'Pasta Carbonara',
    text: 'Rich, delicious, creamy pasta',
    image: 'http://mymansbelly.com/wp-content/uploads/2009/12/Brown_Butter_Fall_Pasta_url.jpg',
    restrictions: ['vegan', 'dairy'],
    cuisines: ['Italian']
  },
  { 
    name: 'Filet Mignon with Rich Balsamic Glaze',
    text: `This is a great Valentine’s Day meal. The red wine and balsamic glaze may be the best sauce you've ever tasted! Try these tender steaks with asparagus and baby red potatoes.`,
    image: 'https://www.homewetbar.com/blog/wp-content/uploads/2014/04/how-to-grill-steak.jpg',
    restrictions: null,
    cuisines: ['American']
  }],
  dish: {}
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