module.exports = {
  setAuthToken: function(token) {
    return { type: 'SET_AUTHTOKEN', token };
  },

  setCurrentUser: function(id) {
    return { type: 'SET_CURRENT_USER', id };
  },

  setCurrentChef: function(id) {
    return { type: 'SET_CURRENT_CHEF', id };
  },

  clearAuthToken: function() {
    return { type: 'CLEAR_AUTHTOKEN' };
  },

  clearCurrentUser: function() {
    return { type: 'CLEAR_CURRENT_USER' };
  },

  clearCurrentChef: function() {
    return { type: 'CLEAR_CURRENT_CHEF'};
  },
};
