module.exports = {
  updateName: function (name) {
    return {type: 'UPDATE_DISH_NAME', name};
  },
  updateText: function (text) {
    return {type: 'UPDATE_DISH_TEXT', text};
  },
  updatePrice: function (price) {
    return {type: 'UPDATE_DISH_PRICE', price};
  },
  updateRestrictions: function (restrictions) {
    return {type: 'UPDATE_DISH_RESTRICTIONS', restrictions};
  },
  updateCuisine: function (cuisines) {
    return {type: 'UPDATE_DISH_CUISINES', cuisines};
  },
  updateDish: function (dish) {
    return {type: 'UPDATE_ENTIRE_DISH', dish};
  },
  deleteDish: function () {
    return {type: 'REMOVE_DISH'};
  },
  addToDishList: function (dishList) {
    return {type: 'DISH_LIST', dishList};
  },
  ///CHECK IF THIS WORKS
  requestDishInfo: function (dishList) {
    return {type: 'REQUEST_DISH_INFO', dishList}; 
  },
  receiveDishInfo: function (dishList) {
    return {type: 'RECEIVE_DISH_INFO', };
  }
};