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
  Alert,
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
  
  doConfirm(eventData) {
    const rootNavigator = this.props.navigation.getNavigator('root');

    fetch(`${serverURI}/events`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData)
    })
    .then(function() {
      rootNavigator.navigationContext.performAction(({ tabs, stacks }) => {
        tabs('main').jumpToTab('upcoming');
        stacks('search').popToTop();
      });
    })
    .catch(function(err){
      alert(err);
    });
  }

  getTotalCost() {
    let totalCost = 0;
    let selected = this.state.selected;
    let dishes = this.state.dishes;
    for (let i = 0; i < dishes.length; i++) {
      let dishId = dishes[i].id;
      if (selected[dishId] === true) {
        totalCost += this.state.quantity * dishes[i].price;
      }
    }
    return totalCost;
  }

  confirmEvent() {
    let eventData = {
      name: 'Upcoming Event',
      // time: Date.now(),
      location: this.props.location,
      text: 'An upcoming event',
      chefId: this.props.details.id,
      userId: this.props.currentUser,
      quantity: {}
    };

    let selected = this.state.selected;
    for (let key in selected) {
      if (selected[key] === true) {
        // eventData.dishes.push(key);
        eventData.quantity[key] = this.state.quantity;
      }
    }

    let context = this;
    if (Object.keys(selected).length) {
      Alert.alert('Confirm Event', '',
        [{text: 'Submit', onPress: () => (this.doConfirm(eventData))},
         {text: 'Cancel', onPress: () => (0)}]);
      
    } else {
      Alert.alert('No Dish Selected!', 'Please select dishes for your event',
        [{text: 'Okay', onPress: () => (0)}]);
    }
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
        // flex: 1,
        height: width/4,
        width: width/2
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
        marginTop: 12
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
          <View style={styles.quantity}>    
            <View style={styles.row}>   
              <View style={styles.changeQuantityButton}>    
                <Button   
                  title="-"   
                 onPress={this.changeQuantity.bind(this, -1)}    
                />    
              </View>   
              <Text style={styles.textCenter}>Quantity: {this.state.quantity}</Text>    
              <View style={styles.changeQuantityButton}>    
                <Button   
                  title="+"   
                  onPress={this.changeQuantity.bind(this, 1)}   
                />    
              </View>
            </View>   
            <Text style={styles.textCenter}>Total Cost: {formatCash(this.getTotalCost())}</Text>
          </View>
          <Button title="Set Location" onPress={() => (console.log("TODO: IMPLEMENT LOCATION"))}/>
          <Button title="Confirm" onPress={this.confirmEvent.bind(this)} />
        </ScrollView>
      </View>
    );

    function formatCash(number) {
      if (number % 1 === 0) { //if no tenths
        return `$${number}.00`;
      } 

      if (number * 10 % 1 === 0) { //if no hundredths
         return `$${number}0`;
      }
      return `$${number}`;
    }

    function renderDish(dish, context) {
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
              <Text style={styles.flex}>{`${formatCash(dish.price)}`}</Text>
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
