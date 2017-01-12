module.exports = {
  setAuthToken: function(token) {
    return { type: 'SET_AUTHTOKEN', token };
  },

  setCurrentUser: function(id) {
    return { type: 'SET_CURRENT_USER', id };
  },

  clearAuthToken: function() {
    return { type: 'CLEAR_AUTHTOKEN', token: null };
  },

  clearCurrentUser: function() {
    return { type: 'CLEAR_CURRENT_USER', id: null };
  },
};
