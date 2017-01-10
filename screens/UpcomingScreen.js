import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import EventListing from '../components/EventListing';

export default class UpcomingScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Upcoming Events',
    },
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
