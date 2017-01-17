import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  ActivityIndicator,
  View,
  RefreshControl,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { serverURI } from '../config';

import EventListing from '../components/EventListing';

import { connect } from 'react-redux';

class UpcomingScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Upcoming Events',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      loading: true,
      refreshing: false,
    };
  }

  componentWillMount() {
    this.fetchUpcoming.call(this);
  }

  fetchUpcoming() {
    let context = this;
    this.setState({refreshing: true}, function() {
      fetch(`${serverURI}/events/users/${this.props.currentUser}`)
        .then(function(resp) {
          if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
            return resp.json();
          } else {
            return resp.text();
          }
      }).then(function(events) {
        context.setState({loading: false, refreshing: false, events})
      }).catch(function(err) {
        alert(err);
      });
    });
  }

  render() {
    return (
      this.state.loading ?
        <View style={styles.center}>
          <ActivityIndicator size="large"/>
        </View> :

        <ScrollView
        style={[styles.container]}
        contentContainerStyle={this.props.route.getContentContainerStyle()}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.fetchUpcoming.bind(this)}
            tintColor="#ccc"
            title=" "
            titleColor="#000000"
            colors={['#ccc', '#ccc', '#ccc']}
            progressBackgroundColor="#ffff00"
          />
        }>
          {this.state.events.map((event, index) =>
            <EventListing
              key={index}
              name="You"
              chef="Someone Else"
              dateTime=""
            />
          )}
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(UpcomingScreen);
