import React, { Component } from 'react';
import ListItem from './ListItem';
import ListItemSection from './ListItemSection';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';

const DishViewEntry = (props) => {
  const {headerTextStyle, headerContentStyle, imageStyle, imageContainerStyle} = styles;
  const {name, text, image} = props.dish;

  return (
      <ListItem>
        <ListItemSection>
        <View style={imageContainerStyle}>
          <Image 
          style={imageStyle}
          source={{uri: image}}
          />
        </View>
          <View style={headerContentStyle}>
            <Text style={headerTextStyle}> {name} </Text>
          </View>
        </ListItemSection>
      </ListItem>
  ); 
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  imageStyle: {
    height: 50,
    width: 50
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
};
export default DishViewEntry;

