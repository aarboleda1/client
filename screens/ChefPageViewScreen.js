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
  Modal,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import { connect } from 'react-redux';
import Router from '../navigation/Router';
import Colors from '../constants/Colors';

import { serverURI } from '../config';

class ChefPageViewScreen extends React.Component {
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
      selectedDish: {
        name: 'No Dish Selected',
        description: 'No dish selected.',
        cuisine: 'No dish selected.',
        cost: 0.01,
        restrictions: ['No', 'Dish', 'Selected'],
        image: 'http://omfgdogs.com/omfgdogs@2X.gif',
      },
    };
  }

  componentWillMount() {
    let context = this;
    // get dishes for the current chef using chefid
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
    let eventData = {
      name: 'Upcoming Event',
      time: Date.now(),
      location: this.props.location,
      text: 'An upcoming event',
      chefId: this.props.details.id,
      userId: this.props.currentUser,
      quantity: {},
      dishes: [],
    }

    let selected = this.state.selected;
    for (let key in selected) {
      if (selected[key] === true) {
        eventData.dishes.push(key);
        eventData.quantity[key] = this.state.quantity;
      }
    }

    let context = this;
    fetch(`${serverURI}/events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    })
    .then(function() {
      context.props.navigator.push(Router.getRoute('confirmEvent', eventData));
    })
    .catch(function(err){
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
        flexDirection: 'column',
        // flexDirection: 'row',
        // flexWrap: 'wrap',
      },
      dish: {
        // height: height/10,
        // width: width,
        // alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
      },
      dishImage: {
        flex: 1,
        height: width/4,
        width: width/4
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

    const dishModalStyles = StyleSheet.create({
      chefImage: {
        width,
        height: height / 3,
      },
      container: {
        padding: 8,
        flex: 1,
      },
    });

    let context = this;

    return (
      <View style={styles.flex}>
        <Text>{this.props.details.name}</Text>
        <ScrollView
          style={styles.container}
          contentContainerStyle={this.props.route.getContentContainerStyle()}>
          <Image style={styles.splashImage} source={{uri: this.props.details.img}}/>
          <Text>Biography:</Text>
          <Text>{this.props.details.desc}</Text>
          <Text>Menu:</Text>
          <View style={styles.dishes}>
            {this.state.dishes.map(function(dish, index) {
              return (
                <View key={index}>
                  {renderDish(dish, context)}
                </View>
              );
            })}
          </View>

          <Button title="Modal" onPress={()=>{this.setState({
            showDishModal: !this.state.showDishModal,
          })}}/>
          <Button title="Set Location" onPress={() => (console.log("TODO: Set location for ChefPageViewScreen.js"))}/>
          <Button title="Next" onPress={this.confirmEvent.bind(this)} />
        </ScrollView>

        <Modal
          animimationType="fade"
          transparent={false}
          visible={!!this.state.showDishModal}
        >
          <Image style={dishModalStyles.chefImage} source={{ uri: this.state.selectedDish.image }}/>
          <View style={dishModalStyles.container}>
            <Text>{this.state.selectedDish.name}</Text>
            <Text>{this.state.selectedDish.description}</Text>
            <Text>{this.state.selectedDish.cuisine}</Text>
            {this.state.selectedDish.restrictions.map(restriction =>
              <Text key={restriction}>{restriction}</Text>
            )}
            <Text>{this.state.selectedDish.cost}</Text>
            <Text>{'>>>Quantity Stuff Here<<<'}</Text>
            <Button title="Close" onPress={()=>{this.setState({
                  showDishModal: !this.state.showDishModal,
                })}}/>
          </View>
        </Modal>
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

      return (
        <TouchableOpacity key={dish} style={styles.dish} onPress={toggleCheck.bind(context)}>
          <View style={styles.dish}>
            <Image style={styles.dishImage} source={{ uri: dish.image }}/>
            <View style={styles.dishDetails}>
              <Text>{dish.name}</Text>
              <Text>{dish.text}</Text>
              <Text>${dish.price}</Text>
            </View>
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

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser,
    location: state.search.location,
  };
}

export default connect(mapStateToProps)(ChefPageViewScreen);
