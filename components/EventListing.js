import React, { Component } from 'react';

import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';

import { withNavigation } from '@exponent/ex-navigation';

import Router from '../navigation/Router';

@withNavigation
export default class EventListing extends Component {
  constructor(props) {
    super(props);
  }

  viewEvent() {
    let details = {};
    this.props.navigator.push(Router.getRoute('eventDetailsView', { details }));
  }

  // TODO: Add diferentiation between
  // client & chef perspective of event
  render() {
    const dynamicStyles = StyleSheet.create({
      eventListing: {
        backgroundColor: this.props.isChef ? '#D6FFE5' : '#BCEEFF',
      }
    });

    return (
      <TouchableOpacity onPress={this.viewEvent.bind(this)}>
        <View style={[styles.flex, styles.eventListing, dynamicStyles.eventListing]}>
          <View style={styles.row}>
            <Text style={[styles.flex, styles.alignStart]}>{this.props.name}</Text>
            <Text style={[styles.flex, styles.alignEnd, styles.textRight]}>
              {this.props.chef}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.flex, styles.alignStart]}>{this.props.dateTime}</Text>
            <Text style={[styles.flex, styles.alignEnd, styles.textRight]}>
              ${this.props.cost}
            </Text>
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
    marginTop: 1,
  },
});
