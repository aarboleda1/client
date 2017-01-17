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
  };
  static route = {
    navigationBar: {
      title: 'Preview',
    },
  }
  render () {
    let { name, image } = this.props.route.params.dish
    let { headerTextStyle, headerContentStyle, imageStyle} = styles;
    return (
    <ListItem>
      <ListItemSection>
        <View style={headerContentStyle}>
          <Text style={headerTextStyle}>{ name }</Text>
        </View>
      </ListItemSection>
      <ListItemSection>
        <View>
          <Image
            source={{uri: image}}
            style={{height: 300, flex: 1, width: null}}
          />
        </View>
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


