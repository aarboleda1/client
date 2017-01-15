import React, { Component } from 'react';

import {
  View,
  Text,
} from 'react-native';

const DishViewEntry = (props) => {
  console.log(props);
  return (
      <Text>
      {props.dish.name}
      </Text>
  ); 
};
export default DishViewEntry;

