module.exports = {
  setChefLocation: function(location) {
    return { type: 'SET_CHEF_LOCATION', location };
  },

  clearChefLocation: function() {
    return { type: 'CLEAR_CHEF_LOCATION' };
  },
};
