module.exports = {
  setAuthToken: function(token) {
    return { type: 'SET_AUTHTOKEN', token };
  },

  setCurrentUser: function(id) {
    return { type: 'SET_CURRENT_USER', id };
  },

  clearAuthToken: function() {
    return { type: 'CLEAR_AUTHTOKEN' };
  },

  clearCurrentUser: function() {
    return { type: 'CLEAR_CURRENT_USER' };
  },
};
