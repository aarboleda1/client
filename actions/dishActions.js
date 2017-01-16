module.exports = {
  updateName: function (name) {
    return {type: 'UPDATE_NAME', name};
  },
  updateText: function (text) {
    return {type: 'UPDATE_TEXT', text};
  },
  updatePrice: function (price) {
    return {type: 'UPDATE_PRICE', price};
  },
  updateRestrictions: function (restrictions) {
    return {type: 'UPDATE_RESTRICTIONS', restrictions};
  },
  updateCuisine: function (cuisines) {
    return {type: 'UPDATE_CUISINES', cuisines};
  },
  updateDish: function (dish) {
    return {type: 'UPDATE_DISH', dish};
  },
  deleteDish: function () {
    return {type: 'REMOVE_DISH'};
  },
  addToDishList: function (dishList) {
    return {type: 'DISH_LIST', dishList};
  }
};