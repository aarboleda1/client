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
      id: this.props.id,
      name: this.props.name,
      dateTime: this.props.time,
      location: this.props.location,
      description: this.props.description,
      isChef: this.props.isChef,
      chef: this.props.chef,
      currentUser: this.props.currentUser
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
            <Text style={styles.text}>{this.props.name}</Text>
            <Text style={[styles.flex, styles.alignStart]}>{this.props.location}</Text>
            <Text style={[styles.flex, styles.alignEnd, styles.textRight]}>{this.props.chef.name}</Text>
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
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: '#4b3832',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
  },
  text: {
    fontSize: 20,
    alignSelf: 'flex-start'
  },
  icon: {
    alignSelf: 'flex-end',
  },
  outer: {
    flexDirection: 'row',
    flex: 2,
  }
});