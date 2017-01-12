import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  Button,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import {connect} from 'react-redux';

import { serverURI } from '../config';

import Rating from '../components/Rating';

class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  componentWillMount() {
    let setState = this.setState.bind(this);
    fetch(`http://localhost:3000/users/${this.props.currentUser}`)
    .then(function(resp) {
      if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
        return resp.json();
      } else {
        return resp.text();
      }
    })
    .then(function(userData) {
      userData = userData[0];
      setState({userData, loading: false})
    })
    .catch(function(err) {
      alert(err);
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      loading: true,
    }
  }

  render() {
    const {height, width} = Dimensions.get('window');

    const dynamicStyles = StyleSheet.create({
      profileImage: {
        width: width / 3,
        height: width / 3,
      },
    });

    return (
      this.state.loading ?
      <ActivityIndicator style={styles.center} /> :
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Image
          source={{ uri: `https://www.gravatar.com/avatar/${this.state.userData.md5}?s=256&d=mm&r=g` }}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>{this.state.userData.name}</Text>
        <Text style={styles.description}>
          {this.state.userData.bio}
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Fugiat, voluptatum at eaque veniam earum.
          Adipisci aliquam quia, architecto cupiditate quidem repellendus, optio et vitae laudantium expedita!
          A odit harum fugit!
        </Text>
        <View style={styles.rating}>
          <Text>Rating: </Text>
          <Rating stars={this.state.userData.avgRating || 4}/>
        </View>
        <View style={styles.editButton}>
          <Button
            title="Edit"
            onPress={()=>{}}
          />
        </View>
      </ScrollView>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
  };
}

export default connect(mapStateToProps)(ProfileScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fullName: {
    fontSize: 24,
  },
  description: {
    marginBottom: 4,
  },
  rating: {
    flexDirection: 'row',
  },
  editButton: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 64,
  },
});
