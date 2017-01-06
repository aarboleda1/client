import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
} from 'react-native';

export default class EventDetailsScreen extends Component {
  constructor(props) {
    super(props);
  }

  static route = {
    navigationBar: {
      title: 'Event Information',
    },
  }

  render() {
    return (
      <View style={styles.dishes}>
        <View style={styles.menuItem}>
          <Image source={{ uri: 'http://lorempixel.com/150/150/food/1'}}/>
        </View>
        <View style={styles.menuItem}>
          <Image source={{ uri: 'http://lorempixel.com/150/150/food/2'}}/>
        </View>
        <View style={styles.menuItem}>
          <Image source={{ uri: 'http://lorempixel.com/150/150/food/3'}}/>
        </View>
        <View style={styles.menuItem}>
          <Image source={{ uri: 'http://lorempixel.com/150/150/food/4'}}/>
        </View>
        <View style={styles.menuItem}>
          <Image source={{ uri: 'http://lorempixel.com/150/150/food/5'}}/>
        </View>
        <View style={styles.menuItem}>
          <Image source={{ uri: 'http://lorempixel.com/150/150/food/6'}}/>
        </View>
        <View style={styles.menuItem}>
          <Image source={{ uri: 'http://lorempixel.com/150/150/food/7'}}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  dishes: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});
