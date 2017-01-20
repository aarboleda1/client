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
      target: this.props.target,
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
      >
        <View 
        style={[styles.container, dynamicStyles.eventListing]}>
          <View sytle={styles.text}>
            <Text style={styles.title}>{this.props.name}</Text>
            <View style={styles.divider}></View>
            
            <Text style={[styles.info]}>
            <Text style={{fontWeight:'bold'}}>Location: </Text>
             {this.props.location}</Text>
            <Text style={styles.info}>{this.props.isChef ? 'Chef Name: ' : 'Client Name: ' }{this.props.target.name}</Text>
          </View>
          
          <View
          style={styles.icon}>
            <FontAwesome
              name={this.props.isChef ? 'fire' : 'cutlery'}
              size={45}
              style={{marginRight: 5}}
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
    padding: 5,
  },
  title: {
    fontSize: 22,
    alignSelf: 'flex-start',
    fontWeight: '400',
    marginLeft: 5,
  },
  info: {
    // fontWeight: 'bold',
    marginLeft: 5,
    marginTop: 5,
    fontSize: 17,
    // padding: 2,
  },
  icon: {
    alignSelf: 'center',
  },
  divider: {
    borderColor: 'black',
    borderTopWidth: 2,
    marginLeft: 5,
  },
  text: {
    marginLeft: 20,
  },
});





