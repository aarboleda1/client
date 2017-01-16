//This component is just a wrapper with default styling 
import React, { Component } from 'react';
import { View, Text } from 'react-native';

const ListItem = (props) => {
  return (
    <View style={ styles.containerStyle }>
      {props.children}
    </View>
  ); 
};

const styles = {
  containerStyle: {
    borderWidth: 1,
    borderRadius: 2,
    borderColor: '#ddd',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    marginLeft: 1,
    marginRight: 1,
    marginTop: 2  
  }
};

export default ListItem;


