module.exports = {
  updateDishName: function (name) {
    return {type: 'UPDATE_DISH_NAME', name};
  },
  updateDishText: function (text) {
    return {type: 'UPDATE_DISH_TEXT', text};
  },
  updateDishPrice: function (price) {
    return {type: 'UPDATE_DISH_PRICE', price};
  },
  updateDishRestrictions: function (restrictions) {
    return {type: 'UPDATE_DISH_RESTRICTIONS', restrictions};
  },
  updateDishCuisine: function (cuisines) {
    return {type: 'UPDATE_DISH_CUISINES', cuisines};
  },
  updateEntireDish: function (dish) {
    return {type: 'UPDATE_ENTIRE_DISH', dish};
  },
  deleteEntireDish: function () {
    return {type: 'REMOVE_DISH'};
  },




  addToDishList: function (dishList) {
    return {type: 'ADD_TO_DISH_LIST', payload: dishList};
  },




  ///CHECK IF THIS WORKS
  requestDishInfo: function (dishList) {
    return {type: 'REQUEST_DISH_INFO', dishList}; 
  },
  receiveDishInfo: function (dishList) {
    return {type: 'RECEIVE_DISH_INFO', };
  }
};