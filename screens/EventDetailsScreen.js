import React, { Component } from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  Text,
  ScrollView,
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
    // console.log('props.chef is ', this.props.details.chef);
    return (
      <ScrollView
        style={styles.dishes}
        contentContainerStyle={styles.dishesContainer}>
        <View style={[styles.flex, styles.textPadding]}>
          <Text style={styles.textCenter}>{this.props.details.name}</Text>
          <Text style={styles.textCenter}>{this.props.details.location}</Text>
          <Text style={styles.textCenter}>{this.props.details.dateTime}</Text>
          <View style={[styles.flex, styles.row]}>
            <Image
            source={{ uri: this.props.details.chef.image}}
            style={styles.chef}
            />
            <View style={[styles.flex, styles.textPadding, {}]}>
              <Text style={styles.textCenter}>{this.props.details.chef.name}</Text>
              <Text>{this.props.details.chef.bio}</Text>
            </View>
          </View>
        </View>
        {this._showDishes(this._getDishes())}
      </ScrollView>
    );
  }

  _getDishes() {
    return [
          {id: 1, name: 'Meat', quantity: 4, price: 4.75},
          {id: 2, name: 'Cotton Candy', quantity: 1, price: 5},
          {id: 3, name: 'Actual Angel Hair', quantity: 15, price: 2.25},
          {id: 4, name: 'Honeycrisp Apple Pie', quantity: 10, price: 3.66},
          {id: 5, name: 'Unicorn Soup', quantity: 5, price: 7.00},
          {id: 6, name: 'Pixie Dust Chips', quantity: 20, price: 1.50},
          {id: 7, name: 'Manatee', quantity: 5, price: 4.50},
          ];
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
        <View style={[styles.flex, styles.row, styles.textPadding]}>
          <Text style={styles.flex}>Total:</Text>
          <Text style={[styles.flex, styles.textRight]}>
            {
              formatCash(dishes.reduce((total, dish) => {
                return total + (dish.price * dish.quantity)
              }, 0))
            }
          </Text>
        </View>
      </View>
      );
  }

  _makeMenuItem(dish) {
    const {height, width} = Dimensions.get('window');

    const dynamicStyles = StyleSheet.create({
      dishImage: {
        width: width / 4,
        height: width / 4,
      },
    });

    return (
      <View style={styles.menuItem}>
        <Image
          source={{ uri: `http://lorempixel.com/150/150/food/${dish.id}`}}
          style={dynamicStyles.dishImage}
        />
        <View style={[styles.flex, styles.textPadding]}>
          <Text style={[styles.flex, styles.textCenter]}>{dish.name}</Text>
          <View style={styles.row}>
            <Text style={styles.flex}>{`${formatCash(dish.price)} x ${dish.quantity}`}</Text>
            <Text style={[styles.flex, styles.textRight]}>{formatCash(dish.price * dish.quantity)}</Text>
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
    flex: 1,
    flexDirection: 'row',
    paddingRight: 8,
    borderBottomWidth: 1,
  },
  dishes: {
    flex: 1,
  },
  dishesContainer: {
  },
  textCenter: {
    textAlign: 'center',
  },
  textRight: {
    textAlign: 'right',
  },
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  dishTitle: {
    flex: 1,
    textAlign: 'center',
  },
  textPadding: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 8,
    paddingLeft: 8,
  },
  chef: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignSelf: 'center',
  }
});
