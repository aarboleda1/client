import React from 'react';
import {
  AsyncStorage,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
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

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        {this.state.events.map((event, index) => (
          <EventListing
            key={index}
            name="You"
            chef="Someone Else"
            dateTime="The Future"
          />
        ))}

        <Text style={styles.chefText}> Events as Host </Text>
        <EventListing
          chef="Guy Fieri"
        />
        {this.props.currentChef ? (
        <View>
          <Text style={styles.chefText}> Events as Chef </Text>

          <EventListing
            chef="Papa John"
            isChef={true}
          />
        </View>
        ) : null}
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

