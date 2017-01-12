import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  AsyncStorage,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { serverURI } from '../config';

import EventListing from '../components/EventListing';

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
        <Button
          title="See past events"
          onPress={this.viewPastEvents.bind(this)}
        />
        {this.state.events.map((event, index) => (
          <EventListing
            key={index}
            name="You"
            chef="Someone Else"
            dateTime="The Future"
          />
        ))}
        <EventListing
          name="John Doe"
          chef="Guy Fierri"
          dateTime="12/31/2016 4:15PM"
        />
        <EventListing
          name="Big Bird"
          chef="Papa John"
          dateTime="1/7/2016 1:00AM"
          isChef={true}
        />
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 4,
  },
});
