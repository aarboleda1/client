module.exports = {
  setSearchCuisine: function(cuisine) {
    return { type: 'SET_SEARCH_CUISINE', cuisine };
  },
  
  setSearchLocation: function(location) {
    return { type: 'SET_SEARCH_LOCATION', location };
  },

  toggleSearchRestriction: function(restriction) {
    return { type: 'TOGGLE_SEARCH_RESTRICTION', restriction };
  },

  toggleSearchPrice: function(price) {
    return { type: 'TOGGLE_SEARCH_PRICE', price };
  },

  clearSearchCuisine: function() {
    return { type: 'CLEAR_SEARCH_CUISINE' };
  },

  clearSearchLocation: function() {
    return { type: 'CLEAR_SEARCH_LOCATION' };
  },

  clearSearchRestrictions: function() {
    return { type: 'CLEAR_SEARCH_RESTRICTIONS' };
  },

  clearSearchPrices: function() {
    return { type: 'CLEAR_SEARCH_PRICES' };
  },
};
