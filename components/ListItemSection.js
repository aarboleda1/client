// This component is to manage different sections with in a List Item
// etc. => dish descriptions, views 
// Any components that are wrapped in this, will inherit it's nice styling properites
import React, { Component } from 'react';
import { View } from 'react-native';

const ListItemSection = (props) => {
  return (
    <View style={ styles.containerStyle }>
      {props.children}
    </View>
  );
};

const styles = {
  containerStyle: {
    borderBottomWidth: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    borderColor: '#ddd',
    position: 'relative'
  }
};

export default ListItemSection;