import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
} from 'react-native';

import { connect } from 'react-redux';

import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';

class DishPreviewOnlyScreen extends Component {
  constructor (props) {
    super(props)
    const name = this.props.dishes.dishList[0].name;
  };
  static route = {
    navigationBar: {
      title: 'Insert Dish Name Here',
    },
  }
  render () {
    return (
      <ListItem>
        <ListItemSection>
          <Text>{this.name}</Text>
        </ListItemSection>
      </ListItem>
    ) 
  }
};

function mapStateToProps(state) {
  return {
    dishList: state.dishList,
    dishes: state.dishes,
    name: state.dishes.name,
    state,
  };
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  }
}


// map state to props to inherit
export default connect(mapStateToProps)(DishPreviewOnlyScreen);


