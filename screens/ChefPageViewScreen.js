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

import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';

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
    let address = this.state.address.trim();
    let eventData = {
      name: this.state.eventName,
      location: address + ', ' + this.props.location,
      text: this.state.eventText,
      chefId: this.props.details.id,
      userId: this.props.currentUser,
      quantity: {},
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
        flex: 1,
        flexDirection: 'row',
      },
      dishImage: {
        height: 75,
        width: 75
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
      textStyling: {
        textAlign: 'flex-start',
        fontSize: 20,
        fontWeight: '500',
        marginVertical: 1,
        marginBottom: 4,
        paddingTop: 1,
        marginLeft: 4

      },
      textStylingAbout: {
        textAlign: 'flex-start',
        fontSize: 14,
        fontWeight: '500',
        marginVertical: 1,
        marginBottom: 4,
        paddingTop: 1,
        marginLeft: 4,
      },
      aboutContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around'
      },
      headerTextStyle: {
        fontSize: 25,
        paddingLeft: 13,
        color: 'black',
        fontWeight: '600',    
      },
      dishDetailsContainer: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        marginLeft: 6
      }        

    });

    let { headerTextStyle, container, flex, aboutContainer, text } = styles;
    const dishModalStyles = StyleSheet.create({
      chefImage: {
        height: height / 3,
      },
      container: {
        padding: 8,
        flex: 1,
      },
    });

    let context = this;

    return (
      <View style={flex}>
        <Text style={ headerTextStyle }>{this.props.details.name}</Text>
        <ScrollView
          style={ container }
          contentContainerStyle={this.props.route.getContentContainerStyle()}>
          <Image style={styles.splashImage} source={{uri: this.props.details.img}}/>




        {/*Apply styling About title list*/} 
      <ListItemSection> 
        <View style={ styles.aboutContainer }>  
          <Text style={ styles.textStyling }>About</Text>
          <Text style={ styles.textStylingAbout }>{this.props.details.desc}</Text>
        </View>
      </ListItemSection>


      {/*Title things for the menu*/}

          <Text style={ styles.textStylingAbout }>Menu:</Text>


        {/*Dish List Component*/}

          <View style={styles.dishes}>
            {this.state.dishes.map(function(dish, index) {
              return (
                <View key={index}>
                  {renderDish(dish, context)}
                </View>
              );
            })}
          </View>



        {/*View for the Quantity stuff*/}  
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

      {/*Setting the location and Confirm page??*/}    
          <Button title="Set Location" onPress={() => (console.log("TODO: IMPLEMENT LOCATION"))}/>
          <Button title="Confirm" onPress={this.confirmEvent.bind(this)} />
          <TextInput
            placeholder="Street Address"
            onChangeText={text => this.setState({address: text})}
            style={{height: 32}}
          />
          <Text>{this.props.location}</Text>

          <TextInput
            placeholder="Event Title"
            onChangeText={text => this.setState({eventName: text})}
            style={{height: 32, marginTop: 16}}
          />
          <TextInput
            placeholder="Event description"
            onChangeText={text => this.setState({eventText: text})}
            style={{height: 72}}
            multiline={true}
          />
          <Button title="Confirm Event" onPress={this.confirmEvent.bind(this)} />
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
          <ListItemSection>
            <Image style={styles.dishImage} source={{ uri: dish.image }}/>
            <View style={styles.dishDetailsContainer}>
              <Text style={styles.textStylingAbout}>{dish.name}</Text>
              <Text style={styles.textStylingAbout}>{dish.text}</Text>
              <Text style={styles.textStylingAbout}>{`${formatCash(dish.price)}`}</Text>
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
          </ListItemSection>
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
