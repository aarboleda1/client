import { serverURI } from '../config';
import AsyncStorage from 'react-native';
module.exports = {
  postDishToDB: function (newDish, currentUserId) {
    console.log(newDish.image, 'is the image when posting to DB');
    return fetch(`${serverURI}/dishes/chefs/${currentUserId}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',    
      },
      body: JSON.stringify(newDish)
    });  
  }
};
