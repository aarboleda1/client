module.exports = {
  setSearchCuisine: function(cuisine) {
    return { type: 'SET_SEARCH_CUISINE', cuisine };
  },

  clearSearchCuisine: function() {
    return { type: 'CLEAR_SEARCH_CUISINE' };
  },

  setSearchLocation: function(location) {
    return { type: 'SET_SEARCH_LOCATION', location };
  },

  clearSearchLocation: function() {
    return { type: 'CLEAR_SEARCH_LOCATION' };
  },

  toggleSearchPrice: function(price) {
    return { type: 'TOGGLE_SEARCH_PRICE', price }
  },

  clearSearchPrices: function() {
    return { type: 'CLEAR_SERACH_PRICES' };
  },

  toggleSearchRestriction: function(restriction) {
    return { type: 'TOGGLE_SEARCH_RESTRICTION', restriction }
  },

  clearSearchRestrictions: function() {
    return { type: 'CLEAR_SERACH_RESTRICTIONS' };
  },
}
