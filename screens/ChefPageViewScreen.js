import React from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Button,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Router from '../navigation/Router';

import Colors from '../constants/Colors';
import Rating from '../components/Rating';

export default class ChefPageViewScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Chef Info',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      quantity: 1,
      selected: {},
    }
    //TODO make request for more data with details.id
  }

  formatNumber(text) {
    let number = Math.floor(parseInt(text));
    number = isNaN(number) ? 0 : number;
    number = Math.max(0, number);
    this.setState({
      quantity: number,
    });
  }

  confirmEvent() {
    let eventDetails = {
      dishes: [],
      quantity: this.state.quantity,
    };
    let selected = this.state.selected;
    for (let key in selected) {
      if (selected[key] === true) {
        eventDetails.dishes.push(key);
      }
    }

    this.props.navigator.push(Router.getRoute('confirmEvent', eventDetails));
  }

  render() {
    const details = this.props.route.params.details;
    const {height, width} = Dimensions.get('window'); //This must be in the render function to adjust to device rotation

    const styles = StyleSheet.create({
      menu: {
        flex: 1,
      },
      container: {
        flex: 1,
      },
      chefImage: {
        height: 128,
        width: 128,
      },
      chefName: {
        fontSize: 32,
      },
      splashImage: {
        width,
        height: height * 0.35,
        marginBottom: 12,
      },
      dishes: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
      dish: {
        height: 48,
        width: width/3,
      },
      dishImage: {
        flex: 1,
      },
      dishSelection: {
        position: 'absolute',
        right: 2,
        bottom: 2,
        alignItems: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0)',
      },
      quantitySelection: {
        flexDirection: 'row',
      },
    });

    return (
      <View style={styles.menu}>
        <Text>Menu</Text>
        <ScrollView
          style={styles.container}
          contentContainerStyle={this.props.route.getContentContainerStyle()}>
          <Image style={styles.splashImage} source={{uri: `http://lorempixel.com/${Math.ceil(width)}/${Math.ceil(height * 0.35)}/food`}}/>
          <View style={styles.dishes}>
            {[1,2,3,4,5,6,7,8,9,10].map(renderDish.bind(this))}
          </View>
          {/* TODO: Quantity will be moved to individual food modals */}
          <View style={styles.quantitySelection}>
            <Text>Quantity: </Text>
            <TextInput
              keyboardType='phone-pad'
              onChangeText={(text) => this.formatNumber(text)}
              value={`${this.state.quantity}`}
              underlineColorAndroid="rgba(0,0,0,0)"
              maxLength={3}
            />
          </View>
          <Button
            title="Confirm Event"
            onPress={this.confirmEvent.bind(this)}
          />
        </ScrollView>
      </View>
    );

    function renderDish(dish) {

      // TODO Change this to open a modal with details about the food,
      // a quantity field, & an add to event button
      function toggleCheck() {
        let stateUpdate = {
          selected: this.state.selected,
        };
        stateUpdate.selected[dish] = !this.state.selected[dish];
        this.setState(stateUpdate);
      }

      return (
        <TouchableOpacity key={dish} style={styles.dish} onPress={toggleCheck.bind(this)}>
          <View style={styles.dish}>
            <Image style={styles.dishImage} source={{ uri: `http://lorempixel.com/150/150/food/${dish}` }}/>
            {this.state.selected[dish] ?
              <View style={styles.dishSelection}>
                <FontAwesome
                  name="check"
                  size={16}
                  color={Colors.checkMark}
                />
              </View>
              : null}
          </View>
        </TouchableOpacity>
      );
    }
  }
}
