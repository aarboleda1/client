import React, { Component } from 'react';

import {
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
      id: this.props.key,
      name: this.props.name,
      dateTime: this.props.time,
      location: this.props.location,
      description: this.props.description,
      isChef: this.props.isChef,
      chef: this.props.chef,
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
      <TouchableOpacity onPress={this.viewEvent.bind(this)}>
        <View style={[styles.flex, styles.eventListing, dynamicStyles.eventListing]}>
          <View style={styles.row}>
            <Text style={[styles.flex, styles.alignStart]}>{this.props.name}</Text>
            <Text style={[styles.flex, styles.alignStart]}>{this.props.location}</Text>
            <Text style={[styles.flex, styles.alignEnd, styles.textRight]}>
              {this.props.chef.name}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.flex, styles.alignStart]}>{this.props.description}</Text>
            <FontAwesome
              name={this.props.isChef ? 'fire' : 'cutlery'}
              size={16}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
  },
  alignStart: {
    alignSelf: 'flex-start',
  },
  alignEnd: {
    alignSelf: 'flex-end',
  },
  textRight: {
    textAlign: 'right',
  },
  eventListing: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 2,
    paddingBottom: 2,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000',
    marginBottom: -1,
  },
  role: {
    flex: -1,
    width: 16,
    height: 16,
  }
});
