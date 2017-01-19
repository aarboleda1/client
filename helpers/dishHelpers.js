import { serverURI } from '../config';

module.exports = {
  postDishToDB: function (newDish, currentChefId) {
    console.log(newDish, 'is being posted to DB');
    console.log(currentChefId, 'is the chefid');
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