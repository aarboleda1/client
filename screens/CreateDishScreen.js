import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  Image
} from 'react-native';


import { connect } from 'react-redux';

import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';


class CreateDishScreen extends Component {
  constructor (props) {
    super(props);
  }
  static route = {
    navigationBar: {
      title: ' Dish',
    },
  }

  render () {
    return (
      <ScrollView style={styles.flex}>
        <Image 
          source={{uri: this.props.dishes.dishList[0].image}}
          style={styles.imageStyle}
        />
      </ScrollView>
    ) 
  };
}

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
    height: 200,
    flex: 1,
    width: null
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
};

//this.props.dish is now available in here thru redux store
function mapStateToProps(state) {
  return {
    dishList: state.dishList,
    dishes: state.dishes,
    state,
  };
}

export default connect(mapStateToProps)(CreateDishScreen);
