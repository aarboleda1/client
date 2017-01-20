import React, { Component } from 'React';
import {
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Modal,
  View,
  Button,
  AsyncStorage,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import CheckBox from 'react-native-checkbox';
import { serverURI } from '../config';

import { setMapContext } from '../actions/mapContextActions';
import { clearChefLocation } from '../actions/chefActions';
import dishActions from '../actions/dishActions';
import { setCurrentChef } from '../actions/authActions';
import { addToDishList } from '../actions/dishActions';


import DishViewEntry from '../components/DishViewEntry';
import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';
import { getDishesForChef } from '../helpers/dishHelpers';

import { connect } from 'react-redux';

import getTruthyKeys from '../utilities/getTruthyKeys';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class ChefActionsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Chef Settings',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: [],      
      checkedRestrictions: [],
      restrictions: [
        'Eggs',
        'Dairy',
        'Peanuts',
        'Tree Nuts',
        'Seafood',
        'Shellfish',
        'Wheat',
        'Soy',
        'Gluten',
        'Vegetarian',
        'Vegan',
        'Halal',
        'Kosher'
      ],
      cuisines: [
        'American',
        'Chinese',
        'French',
        'Italian',
        'Japanese',
        'Korean',
        'Mexican',
      ],
      dishes: [],
      checkedCuisines: {},
      checkedRestrictions: {},
    };
  }

  toggleState(key) {
    let update = {};
    update[key] = !this.state[key];
    this.setState(update);
  }

  componentDidMount() {
    var context = this;

    fetch (`${serverURI}/dishes/chefs/${this.props.currentChef}`)
      .then((dishes) => dishes.json())
      .then((dishes) => {
        context.props.dispatch(addToDishList(dishes));
        return;
      })
      .catch((error) => {
        console.error(error);
      });    

  }   
  

  componentWillMount() {
    let context = this;
    fetch(`${serverURI}/chefs/userId/${this.props.currentUser}`)
      .then(function(resp) {
        if(resp.status === 200) {
          return resp.json();
        } else {
          return resp.text();
        }
      })
      .then(function(chefData) {
        chefData.cuisines = chefData.cuisines || [];
        chefData.restrictions = chefData.restrictions || [];
        //Remove when route changed to return object rather than [obj]
        let cuisines = context.state.checkedCuisines;
        if (chefData.cuisines.length > 0) { 
          chefData.cuisines.forEach(function(cuisine) {
            cuisines[cuisine] = true;
          });
        }

        let restrictions = context.state.checkedRestrictions;
        if (chefData.restrictions.length > 0) {
          chefData.restrictions.forEach(function(restriction) {
            restrictions[restriction] = true;
          });          
        }

        context.setState({
          name: chefData.name || context.state.name,
          imageURL: chefData.imageURL || context.state.imageURL,
          locations: chefData.locations || context.state.locations,
          checkedRestrictions: restrictions,
          checkedCuisines: cuisines,
          dishes: chefData.dishes || context.state.dishes,
          md5: chefData.md5 || null,
          loading: false,
        });
      })
      .catch(function(err) {
        alert(err);
      });
  }

  addLocation() {
    this.props.dispatch(setMapContext('chefActions'));
    this.props.navigator.push('chooseLocation');
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.chefLocation) {
      let newLocations = this.state.locations.concat(this.props.chefLocation);
      this.props.dispatch(clearChefLocation());
      this.setState({ locations: newLocations });
    }
  };

  _addOrRemoveRestriction(restriction) {
    let update = this.state.checkedRestrictions;
    update[restriction] = !update[restriction];
    this.setState({checkedRestrictions: update});
  }

  _addOrRemoveCuisine(cuisine) {
    let update = this.state.checkedCuisines;
    update[cuisine] = !update[cuisine];
    this.setState({checkedCuisines: update});
  }

  saveChef() {
    let chefData = {
      name: this.state.name,
      bio: this.state.bio,
      locations: this.state.locations,
      restrictions: getTruthyKeys(this.state.checkedRestrictions) || [],
      cuisines: getTruthyKeys(this.state.checkedCuisines) || [],
      image: this.state.avatarURL,
    }

    if (!this.props.currentChef) {
      chefData.userID = this.props.currentUser;
    }

    let context = this;
    let uri = `${serverURI}/chefs`;
    if (this.props.currentChef) {
      uri += `/${this.props.currentChef}`;
    }

    fetch(uri, {
      method: this.props.currentChef ? 'PUT' : 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(chefData)
    }).then(function(resp) {
      if(resp.status === 200) {
        return resp.text();
      } else {
        return resp.text().then(function(message) {
          throw new Error(message);
        });
      }
    }).then(function(data) {
      if (!context.props.currentChef) {
        context.saveCurrentChef.call(context, data);
        alert('Registered as a chef!');
      } else {
        alert('Updated chef profile');
      }
    }).catch(function(err) {
      alert(err);
    });
  }

  saveCurrentChef(chefId) {
    let context = this;
    AsyncStorage.setItem('currentChef', JSON.stringify(chefId))
      .then(function() {
        context.props.dispatch(setCurrentChef(chefId));
      }).catch(function(err) {
        alert(err);
      });
  }

  _handleCreateDishPress () {
    // Needs some touching up, has a weird glitch where you see chefAction Screen
    this.toggleState('showDishesModal');
    this.props.navigator.push('createDishView');
  }

  _renderDishes() {
    if (!this.props.dishes.dishList) {
      return null;
    }
    let {height, width} = Dimensions.get('window');
    let dishHeight = height / 3;
    return this.props.dishes.dishList.map((dish, index) => {
      return (
      <View key={index}>
        <DishViewEntry
          toggleState={this.toggleState.bind(this, 'showDishesModal')}
          dish={dish}
        />
      </View>
      )
    });
  }

  render() {
    return ( this.state.loading ? <ActivityIndicator size="large"/> :
      <ScrollView>
        <TextInput
          onChangeText={(name)=>{this.setState({name})}}
          style={[styles.formInput, {marginLeft: 7, fontSize: 18}]}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Full Name"
          defaultValue={this.state.name}
        />
        <TextInput
          onChangeText={(bio)=>{this.setState({bio})}}
          style={[styles.formInput, 
            {marginLeft: 7, marginTop: 10, marginBottom: 10, fontSize: 18}]}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Chef Bio"
          defaultValue={this.state.bio}
        />
        <TextInput
          onChangeText={(url)=>{this.setState({avatarURL: url})}}
          style={[styles.formInput, {marginLeft: 7, fontSize: 18}]}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Avatar Image URL (Optional)"
          defaultValue={this.state.imageURL}
        />
        {/* Implement some way for the user to edit locations */}
        

        <View 
        style={{backgroundColor: '#e9e9e9'}}
        >
          <Text style={styles.textCenter}>Your Locations</Text>
          
          {this.state.locations.length ? this.state.locations.map((location, index) =>
            <Text key={index}
            style={styles.results}>{location}</Text>
          ) : <Text style={styles.notSet}>No location set</Text>}

          <TouchableHighlight
            underlayColor={'white'}
            title="Add Location"
            onPress={this.addLocation.bind(this)}
            style={styles.test}> 
            <Text style={styles.textTest}>+New Location</Text>
          </TouchableHighlight>
        </View>

        <View style={{backgroundColor: '#cfcfcf'}}>
          <Text style={styles.textCenter}>Your Cuisine Types</Text>

          {getTruthyKeys(this.state.checkedCuisines).length ? 
            getTruthyKeys(this.state.checkedCuisines).map((cuisine, index) =>
              <Text key={index} style={styles.results}>{cuisine}</Text>
            ) : <Text style={styles.notSet}>No Cuisine Type Set</Text>}

          <TouchableHighlight
            underlayColor={'white'}
            title="Edit Cuisines"
            onPress={this.toggleState.bind(this, 'showCuisinesModal')}
            style={[styles.test]}> 
            <Text style={[styles.textTest]}>Edit Cuisines</Text>
          </TouchableHighlight>
        </View>

        <View style={{backgroundColor: '#e9e9e9', flex: 1}}>
          <Text style={[styles.textCenter]}>Your Restrictions</Text>
          

          {getTruthyKeys(this.state.checkedCuisines).length ? 
            getTruthyKeys(this.state.checkedRestrictions).map((restriction, index) =>
              <Text key={index} style={styles.results}>-{restriction}</Text>
            ) : <Text style={styles.notSet}>No Restrictions Set</Text>}


            <TouchableHighlight
              underlayColor={'white'}
              title="Edit Restrictions"
              onPress={this.toggleState.bind(this, 'showRestrictionsModal')}
              style={[styles.test]}> 
              <Text style={styles.textTest}>Edit Restrictions</Text>
            </TouchableHighlight>
        </View>       
        
        <View style={{backgroundColor: '#cfcfcf'}}>
          <Text style={[styles.flex, 
                        styles.textCenter, 
                        styles.verticalMargins]}>
            Your Menu
          </Text>
          {this.props.currentChef ? 
            <TouchableHighlight
              underlayColor={'white'}
              title="Edit Menu"
              onPress={this.toggleState.bind(this, 'showDishesModal')}
              style={[styles.test]}> 
              <Text style={styles.textTest}>Edit Menu</Text>
            </TouchableHighlight> : null
          }
         </View>        

        <View style={styles.saveStyle}>
            <TouchableHighlight
              underlayColor={'white'}
              title="Save Chef Profile"
              onPress={this.saveChef.bind(this)}
              style={[styles.test]}> 
              <Text style={styles.saveText}>Save Chef Profile</Text>
            </TouchableHighlight>
        </View>

        <Modal
          animationType="fade"
          transparent={false}
          visible={!!this.state.showRestrictionsModal}>
          <ScrollView contentContainerStyle={[styles.modal]}>
            <Text style={styles.titleText}>Choose Your Dietary Cooking Restrictions</Text>
            
            {this.state.restrictions.map((restriction) => 
              <CheckBox
                checkboxStyle={[styles.checkboxStyle, {marginLeft: 5, margin: -1}]}
                labelStyle={styles.labelStyle}
                key={restriction}
                label={restriction}
                checked={this.state.checkedRestrictions[restriction]}
                onChange={() => 
                  this._addOrRemoveRestriction(restriction)}
              />
            )}            

            <Button
              title="Update Changes"
              onPress={this.toggleState.bind(this, 'showRestrictionsModal')}
              />
          </ScrollView>
        </Modal>

        <Modal
          animationType="fade"
          transparent={false}
          visible={!!this.state.showCuisinesModal}>
          <ScrollView contentContainerStyle={[styles.modal]}>
            
            <Text style={styles.titleText}>Choose the cuisine types that you will cater</Text>

            {this.state.cuisines.map((cuisine) =>
              <CheckBox
                checkboxStyle={styles.checkboxStyle}
                labelStyle={styles.labelStyle}
                key={cuisine}
                label={cuisine}
                checked={this.state.checkedCuisines[cuisine]}
                onChange={() =>
                  this._addOrRemoveCuisine(cuisine)}
              />
            )}

            <Button
              title="Update Changes"
              onPress={this.toggleState.bind(this, 'showCuisinesModal')}
              />
          </ScrollView>
        </Modal>

        <Modal
          animationType="fade"
          transparent={false}
          visible={!!this.state.showDishesModal}>
          <ScrollView contentContainerStyle={[styles.modal]}>
            <Text style={styles.titleText}>Your Dishes</Text>
              {this._renderDishes()}
          <ListItem>
            <ListItemSection>
            <View style={ styles.saveDishTextContainer }>
              <Button 
                title="+Add New Dish"
                onPress={ this._handleCreateDishPress.bind(this) }
                color="#d9534f"
              />
              </View>
            </ListItemSection>
          </ListItem>
            <Button
              title="Close"
              onPress={this.toggleState.bind(this, 'showDishesModal')}
              />
          </ScrollView>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  cardTitleText: {
    fontSize: 25,
    paddingLeft: 13,
    color: 'black',
    fontWeight: '600',
  },
  formInput: {
    flex: 1,
    height: 30,
  },
  textCenter: {
    textAlign: 'center',
    fontSize: 23,
    fontWeight: '500',
    marginVertical: 1,
    marginBottom: 5,
    paddingTop: 5,
  },
  modal: {
    paddingTop: 15,
    backgroundColor: '#e7e7e6',
    flexDirection: 'column',
    justifyContent: 'center'
  },
  titleText: {
    fontSize: 25,
    fontWeight: '400',
    margin: 15,
    marginLeft: 10,
  },
  test: {
    margin: 8,
    height: WINDOW_HEIGHT / 14,
    width: WINDOW_WIDTH / 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  textTest: {
    fontSize: 20,
    color: 'blue',
  },
  testView: {
    alignItems: 'center',
    paddingTop: 40,
    justifyContent: 'center'
  },
  results: {
    fontSize: 20,
    alignSelf: 'center', 
  },
  checkboxStyle: {
    margin: 7,
  },
  labelStyle: {
    fontSize: 25,
    color: 'black',
  },
  notSet: {
    fontSize: 17,
    alignSelf: 'center',
    color: 'red',
  },
  saveStyle: {
    backgroundColor: '#d9534f',
  },
  saveText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
  },
  saveDishTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center'
  }
});

function mapStateToProps(state) {
  return {
    currentChef: state.currentChef,
    currentUser: state.currentUser,
    chefLocation: state.chef.location,
    dishes: state.dishes,
    state,
  };
}

export default connect(mapStateToProps)(ChefActionsScreen);