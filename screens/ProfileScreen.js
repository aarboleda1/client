import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View,
  Button,
} from 'react-native';

import Rating from '../components/Rating';

export default class ProfileScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Your Profile',
    },
  }

  render() {
    const {height, width} = Dimensions.get('window');

    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      profileImage: {
        width: width / 3,
        height: width / 3,
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
      }
    });

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Image
          source={{ uri: "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=256&d=mm&r=g" }}
          style={styles.profileImage}
        />
        <Text style={styles.fullName}>John Doe</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          Fugiat, voluptatum at eaque veniam earum.
          Adipisci aliquam quia, architecto cupiditate quidem repellendus, optio et vitae laudantium expedita!
          A odit harum fugit!
        </Text>
        <View style={styles.rating}>
          <Text>Rating: </Text>
          <Rating stars={4}/>
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
