export default function dishReducers(state = {
  dishList: [{
    name: 'Pasta Carbonara',
    text: 'Rich, delicious, creamy pasta',
    image: 'http://mymansbelly.com/wp-content/uploads/2009/12/Brown_Butter_Fall_Pasta_url.jpg',
    price: 10,
    restrictions: ['vegan', 'dairy'],
    cuisines: ['Italian']
  },
  { 
    name: 'Filet Mignon with Rich Balsamic Glaze',
    text: 'This is a great Valentine’s Day meal. The red wine and balsamic glaze may be the best sauce youve ever tasted! Try these tender steaks with asparagus and baby red potatoes.',
    image: 'https://www.homewetbar.com/blog/wp-content/uploads/2014/04/how-to-grill-steak.jpg',
    price: 10,
    restrictions: null,
    cuisines: ['American']
  }],


  dish: {
    title: '',
    text: '',
  }
}, action) {
  switch (action.type) {
  case 'UPDATE_DISH_NAME':
    return Object.assign({}, state, { name: action.name });
    break;
  case 'UPDATE_DISH_TEXT':
    return Object.assign({}, state, { text: action.text });
    break;
  case 'UPDATE_DISH_PRICE':
    return Object.assign({}, state, { price: action.price });
    break;
  case 'UPDATE_DISH_RESTRICTIONS':
    return Object.assign({}, state, { restrictions: action.restrictions });
    break;
  case 'UPDATE_DISH_CUISINES':
    return Object.assign({}, state, { cuisine: action.cuisine });
    break;
  case 'UPDATE_ENTIRE_DISH':
    return Object.assign({}, state, { dish: action.dish });
    break;


  case 'ADD_TO_DISH_LIST':
    return Object.assign({}, state, { 
      dishList: action.payload
    });
    break;


  case 'REMOVE_FROM_DISHLIST':
    return Object.assign({}, state, { dishList: action.dishList });
  default:
    return state;
  }
}
// should control state of dish list
//should also control state of individual dishes
//update actions such as update name, title, 