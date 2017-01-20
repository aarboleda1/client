import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
} from 'react-native';

import { serverURI } from '../config';

export default class EventDetailsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dishes: []
    }
  }

  static route = {
    navigationBar: {
      title: 'Event Information',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.dishes}
        contentContainerStyle={styles.dishesContainer}>
        <View style={[styles.flex, styles.textPadding]}>
          <Text style={styles.textCenter}>Event: {this.props.details.name}</Text>
          <Text style={styles.textCenter}>Location: {this.props.details.location}</Text>
          <Text style={styles.textCenter}>Chef: {this.props.details.target.name}</Text>
          <View style={[styles.flex, styles.row]}>
            <Image
            style={styles.chef}
            source={{ uri: this.props.details.target.image || 
                           `http://www.gravatar.com/avatar/${this.props.details.target.md5}?s=256&d=mm&r=g` }}
            />
            <View style={[styles.flex, styles.textPadding, {}]}>
              
              <Text>{this.props.details.target.bio}</Text>
            </View>
          </View>
        </View>
        {this._showDishes(this.state.dishes)}
      </ScrollView>
    );
  }

  componentWillMount() {
    this._fetchDishes();
  }

  _fetchDishes() {
    let context = this;
    fetch(`${serverURI}/events/${this.props.details.id}/dishes`)
      .then(function(resp) {
        if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
          return resp.json();
        } else {
          return resp.text();
        }
    }).then(function(dishes) {
      context.setState({ dishes });
    }).catch(function(err) {
      alert(err);
    });
  }

  _showDishes(dishes) {
    return (
      <View>
        {dishes.map(function (dish, index) {
          return (
            <View key={index}>
              {this._makeMenuItem(dish)}
            </View>
          );
        }.bind(this))}
        <View style={[styles.row, styles.textPadding]}>
          <Text style={styles.totalText}>Total:</Text>
          <Text style={[styles.flex, styles.textRight, styles.totalText]}>
            { formatCash(dishes.reduce((total, dish) => {
                return total + (dish.price * dish.quantities)
              }, 0)) }
          </Text>
        </View>
      </View>
      );
  }

  _makeMenuItem(dish) {
    const {height, width} = Dimensions.get('window');

    const dynamicStyles = StyleSheet.create({
      dishImage: {
        width: width / 3,
        height: height / 7,
        margin: 3,
      },
    });

    return (
      <View style={styles.menuItem}>
        <Image
          source={{ uri: dish.image}}
          style={dynamicStyles.dishImage}
        />
        <View style={[styles.flex, styles.textPadding]}>
          <Text style={[styles.flex, styles.textCenter, styles.dishTitle]}>{dish.name}</Text>
          <View style={styles.row}>
            <Text style={styles.itemCost}>{`${formatCash(dish.price)} x ${dish.quantities}    =`}</Text>
            <Text style={[styles.flex, styles.textRight]}>{formatCash(dish.price * dish.quantities)}</Text>
          </View>
        </View>
      </View>
    );
  }
}

function formatCash(number) {
  if (number % 1 === 0) { //if no tenths
    return `$${number}.00`;
  } 

  if (number * 10 % 1 === 0) { //if no hundredths
     return `$${number}0`;
  }
  return `$${number}`;
}

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    borderBottomWidth: 2,
  },
  dishes: {
    flex: 1,
  },
  dishesContainer: {
  },
  chefName: {
    marginLeft: 30,
    fontSize: 22
  },
  dishText: {
    fontSize: 24
  },
  textCenter: {
    alignSelf: 'center',
    fontSize: 22,
    fontWeight: '300'
  },
  foodText: {

  },
  itemCost:{
    fontSize: 21,
  },
  textRight: {
    textAlign: 'right',
    fontSize: 20
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  totalText: {
    fontSize: 21,
    fontWeight: 'bold'
  },
  dishTitle: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',

  },
  textPadding: {
    margin: 8,
  },
  chef: {
    width: 78,
    height: 78,
    borderRadius: 30,
  }
});
