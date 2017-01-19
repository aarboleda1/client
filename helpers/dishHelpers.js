import { serverURI } from '../config';

module.exports = {
  postDishToDB: function (newDish, currentChefId) {
    return fetch(`${serverURI}/dishes/chefs/${currentChefId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',    
      },
      body: JSON.stringify(newDish)
    });  
  },


};


// export default connect(mapStateToProps)(ChefActionsScreen);