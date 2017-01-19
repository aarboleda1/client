import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import {
  ExponentLinksView,
} from '@exponent/samples';

import { serverURI } from '../config';

import EventListing from '../components/EventListing';

import { connect } from 'react-redux';

import {
  FontAwesome,
} from '@exponent/vector-icons';

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
          if(resp.status === 200) {
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
        style={styles.container}
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
            id={event.id}
            name={event.name}
            time={event.time}
            location={event.location}
            description={event.text}
            chef={event.chefInfo}
            currentUser= {this.props.currentUser}
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#e7e7e6',
  },
  text: {
    fontSize: 23,
    marginTop: 10,
    marginBottom: 10,
  },
  subText: {
    fontSize: 17,
  },
  icon: {
    alignSelf: 'flex-end',
    padding: 5,
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chefText: {
    paddingTop: 20,
    fontSize: 20,
    fontWeight: '500'
  },

});

function mapStateToProps(state) {
  return {
    currentChef: state.currentChef,
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(UpcomingScreen);


// Code for icons, please leave for now
// {<View
//   style={styles.icon}>

//   <FontAwesome
//   name={'cutlery'}
//   size={22} >
//     <Text style={styles.subText}> = As Host </Text>
//   </FontAwesome>


//   <FontAwesome
//   name={'fire'}
//   size={22} >
//     <Text style={styles.subText}> = As Chef </Text>
//   </FontAwesome>

// </View>}

