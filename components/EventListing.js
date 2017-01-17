import React, { Component } from 'react';

import {
  TouchableHighlight,
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import {
  FontAwesome,
} from '@exponent/vector-icons';

import { withNavigation } from '@exponent/ex-navigation';

import Router from '../navigation/Router';

@withNavigation
export default class EventListing extends Component {
  constructor(props) {
    super(props);
  }

  viewEvent() {
    let details = {
      chef: this.props.chef,
      name: this.props.name,
      // dateTime: this.props.dateTime,
      isChef: this.props.isChef,
    };
    this.props.navigator.push(Router.getRoute('eventDetailsView', { details }));
  }

  // TODO: Add diferentiation between
  // client & chef perspective of event
  render() {
    const dynamicStyles = StyleSheet.create({
      eventListing: {
        backgroundColor: this.props.isChef ? '#FFF9F9' : '#F8FCFC',
      }
    });

    return (
      <TouchableHighlight 
      onPress={this.viewEvent.bind(this)}
      style={styles.outer}
      >
        <View 
        style={[styles.container, dynamicStyles.eventListing]}>
          
          <View>
            <Text style={styles.text}>
              {this.props.chef}
            </Text>
          </View>
          
          <View
          style={styles.icon}>
            <FontAwesome
              name={this.props.isChef ? 'fire' : 'cutlery'}
              size={30}
              
            />
          </View>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    // paddingLeft: 5,
    // paddingRight: 1,
    // paddingTop: 20,
    // paddingBottom: 2,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: '#4b3832',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    // margin: 5,
  },
  text: {
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  icon: {
    alignSelf: 'flex-end',
    // margin: 20,
    // marginBottom: 
  },
  outer: {
    flexDirection: 'row',
    flex: 2,
    // marginBottom: 5,
    // borderWidth: 2,
  }
});
