import React, { Component } from 'react';
import ListItem from './ListItem';
import ListItemSection from './ListItemSection';
import {
  View,
  Text,
  Image,
  TouchableHighlight
} from 'react-native';
import Router from '../navigation/Router';
import { withNavigation } from '@exponent/ex-navigation';


@withNavigation
class DishViewEntry extends Component {
  constructor (props) {
    super (props) 
    const {headerTextStyle, headerContentStyle, imageStyle, imageContainerStyle} = styles;
    const {name, text, image} = this.props.dish;
  }

  _handleNavigationPress () {
    this.props.toggleState();
    this.props.navigator.push(Router.getRoute('dishPreviewOnlyView', {dish: this.props.dish} ));
  };

  render () {
    return (
      <TouchableHighlight
        onPress={this._handleNavigationPress.bind(this)}
        underLayColor={'blue'}
      >
        <ListItem>
          <ListItemSection>
          <View style={styles.imageContainerStyle}>
            <Image 
            style={styles.imageStyle}
            source={{uri: this.props.dish.image}}
            />
          </View>
            <View style={styles.headerContentStyle}>
              <Text style={styles.headerTextStyle}> {this.props.dish.name} </Text>
            </View>
          </ListItemSection>
        </ListItem>
      </TouchableHighlight>
    );
  } 
};



const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 22,
    fontWeight: '300'
  },
  imageStyle: {
    height: 80,
    width: 80
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
};

export default DishViewEntry;

