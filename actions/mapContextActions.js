module.exports = {
  setMapContext: function(context) {
    return { type: 'SET_MAP_CONTEXT', context };
  },

  clearMapContext: function() {
    return { type: 'CLEAR_MAP_CONTEXT' };
  }
};
