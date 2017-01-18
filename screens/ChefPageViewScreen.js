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
  AsyncStorage,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import {connect} from 'react-redux';
import Router from '../navigation/Router';
import Colors from '../constants/Colors';
import Rating from '../components/Rating';

import { serverURI } from '../config';

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
      dishes: [],
    }

  }

  componentWillMount() {
    let context = this;
    fetch(`${serverURI}/dishes/chefs/${this.props.details.id}`)
      .then(function(resp) {
        if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
          return resp.json();
        } else {
          return resp.text().then(function(message) {
            throw new Error(message);
          });
        }
      }).then(function(dishes){
        context.setState({dishes});
      }).catch(function(err) {
        alert(err);
      });
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

    let context = this;

    AsyncStorage.getItem('currentUser').then(function(currentUser) {
      let eventData = {
        name: 'Upcoming Event',
        time: Date.now(),
        location: 'San Francisco, CA, USA',
        text: 'An upcoming event',
        chefId: context.props.details.id,
        userId: currentUser,
        quantity: {},
      }

      let selected = context.state.selected;
      for (let key in selected) {
        if (selected[key] === true) {
          eventData.quantity[key] = context.state.quantity;
        }
      }
      return fetch(`${serverURI}/events`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData)
      })
    }).then(function() {
      context.props.navigator.push(Router.getRoute('confirmEvent', eventDetails));
    }).catch(function(err){
      alert(err);
    });
  }

  changeQuantity(change) {
    let newVal;
    if (change < 0) {
      newVal = Math.max(this.state.quantity + change, 0);
    } else {
      newVal = Math.min(this.state.quantity + change, 100);
    }
    this.setState({quantity: newVal});
  }

  render() {
    const details = this.props.route.params.details;
    const {height, width} = Dimensions.get('window'); //This must be in the render function to adjust to device rotation

    const styles = StyleSheet.create({
      flex: {
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
      row: {
        flexDirection: 'row',
      },
      textCenter: {
        textAlign: 'center',
      },
      changeQuantityButton: {
        flex: 0.5,
      },
    });

    let context = this;

    return (
      <View style={styles.flex}>
        <Text>Menu</Text>
        <ScrollView
          style={styles.container}
          contentContainerStyle={this.props.route.getContentContainerStyle()}>
          <Image style={styles.splashImage} source={{uri: `http://lorempixel.com/${Math.ceil(width)}/${Math.ceil(height * 0.35)}/food`}}/>
          <View style={styles.dishes}>
            {this.state.dishes.map(function(dish, index) {
              return (
                <View key={index}>
                  {renderDish(dish, context)}
                </View>
              );
            })}
          </View>
          {/* TODO: Quantity will be moved to individual food modals */}
          <View style={styles.quantity}>
            <Text style={styles.textCenter}>Quantity: {this.state.quantity}</Text>
            <View style={styles.row}>
              <View style={styles.changeQuantityButton}>
                <Button
                  title="-"
                  onPress={this.changeQuantity.bind(this, -1)}
                />
              </View>
              <View style={styles.changeQuantityButton}>
                <Button
                  title="+"
                  onPress={this.changeQuantity.bind(this, 1)}
                />
              </View>
            </View>
          </View>
          <Button
            title="Confirm Event"
            onPress={this.confirmEvent.bind(this)}
          />
        </ScrollView>
      </View>
    );

    function renderDish(dish, context) {

      // TODO Change this to open a modal with details about the food,
      // a quantity field, & an add to event button
      function toggleCheck() {
        let stateUpdate = {
          selected: context.state.selected,
        };
        stateUpdate.selected[dish.id] = !context.state.selected[dish.id];
        context.setState(stateUpdate);
      }

      // return <Text>I'm a dish!</Text>

      return (
        <TouchableOpacity key={dish} style={styles.dish} onPress={toggleCheck.bind(context)}>
          <View style={styles.dish}>
            <Image style={styles.dishImage} source={{ uri: `http://lorempixel.com/150/150/food/${dish.id % 10}` }}/>
            {context.state.selected[dish.id] ?
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

// function mapStateToProps(state, ownProps){
//   // ******* #4 *******
//   return(
//     selection: state.selection
//   )
// }

// // Generates a container component and connects it to the Redux store
// export default connect(mapStateToProps)(ChefPageViewScreen);














