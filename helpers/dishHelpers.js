import { serverURI } from '../config';
import AsyncStorage from 'react-native';
module.exports = {
  postDishToDB: function (newDish, currentChefId) {
    console.log(newDish.image, 'is the image when posting to DB');
    return fetch(`${serverURI}/dishes/chefs/${currentChefId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',    
      },
      body: JSON.stringify(newDish)
    });  
  },

  getDishesForChef (currentChefId) {
    return fetch (`${serverURI}/dishes/chefs/${currentChefId}`)
      .then((response) => response.json())
      .then((responseJson) => {
        console.log(responseJson, 'are the dishes from the chef!!!!');
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });    

  }
};
