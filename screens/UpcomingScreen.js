import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  AsyncStorage,
  Text,
  View,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { serverURI } from '../config';

import EventListing from '../components/EventListing';

import {
  FontAwesome,
} from '@exponent/vector-icons';

export default class UpcomingScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Upcoming Events',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
  }

  componentWillMount() {
    let context = this;
    AsyncStorage.getItem('currentUser').then(function(currentUser) {
      return fetch(`${serverURI}/events/users/${currentUser}`)
    }).then(function(resp) {
        if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
          return resp.json();
        } else {
          return resp.text();
        }
    }).then(function(events) {
      context.setState({events})
    }).catch(function(err) {
      alert(err);
    })
  }

  viewPastEvents() {
    alert('Not implement bby!');
    // redux things
    // this.props.navigator.push('pastEvents');
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        
        <View
        style={styles.icon}>

        <FontAwesome
        name={'cutlery'}
        size={20} >
          <Text style={styles.subText}> = As Host </Text>
        </FontAwesome>


        <FontAwesome
        name={'fire'}
        size={20} >
          <Text style={styles.subText}> = As Chef </Text>
        </FontAwesome>

        </View>



        {this.state.events.map((event, index) => (
          <EventListing
            key={index}
            name="You"
            chef="Someone Else"
            dateTime="The Future"
          />
        ))}
        <EventListing
          chef="Guy Fieri"
        />
        <EventListing
          chef="Papa John"
          isChef={true}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#e7e7e6',
    // alignItems: 'flex-start'
    // paddingTop: 4,
  },
  text: {
    fontSize: 23,
    marginTop: 10,
    marginBottom: 10,
  },
  subText: {
    fontSize: 15,
  },
  icon: {
    alignSelf: 'flex-end',
    paddingBottom: 3,
    paddingTop: 5,
  },

});
