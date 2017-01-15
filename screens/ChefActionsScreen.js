import React, { Component } from 'React';
import {
  ScrollView,
  StyleSheet,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Modal,
  View
} from 'react-native';

import CheckBox from 'react-native-checkbox';


import { serverURI } from '../config';

import { setMapContext } from '../actions/mapContextActions';
import { clearChefLocation } from '../actions/chefActions';

import DishViewEntry from '../components/DishViewEntry';

import { connect } from 'react-redux';

class ChefActionsScreen extends Component {
  static route = {
    navigationBar: {
      title: 'Chef Actions',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      locations: [],
      restrictions: ['Eggs', 'Dairy', 'Peanuts', 'Tree Nuts', 'Seafood', 'Shellfish', 'Wheat', 'Soy',
        'Gluten', 'Vegetarian', 'Vegan', 'Halal', 'Kosher'],
      dishes: [{
        name: 'Pasta',
        text: 'Yummy pasta',
        image: 'http://mymansbelly.com/wp-content/uploads/2009/12/Brown_Butter_Fall_Pasta_url.jpg',
        restrictions: ['vegan', 'dairy'],
        cuisines: ['Italian']
      },
      { name: 'Steak',
        text: 'Deliciosuly cooked medium rare',
        image: 'https://www.homewetbar.com/blog/wp-content/uploads/2014/04/how-to-grill-steak.jpg',
        restrictions: null,
        cuisines: ['American']
      }
      ],
      checkedRestrictions: []
    };
  }

  toggleState(key) {
    let update = {};
    update[key] = !this.state[key];
    this.setState(update);
  }


  componentWillMount() {
    let context = this;
    console.log(`GET TO ${serverURI}/chefs/userId/${this.props.currentUser}`);
    fetch(`${serverURI}/chefs/userId/${this.props.currentUser}`)
      .then(function(resp) {
        let contentType = resp.headers.map['content-type'];
        if(contentType && contentType === "application/json; charset=utf-8") {
          return resp.json();
        } else {
          return resp.text();
        }
      })
      .then(function(chefData) {
        chefData = chefData[0] || {};
        context.setState({
          name: chefData.name || context.state.name,
          imageURL: chefData.imageURL || context.state.imageURL,
          locations: chefData.locations || context.state.locations,
          restrictions: chefData.restrictions || context.state.restrictions,
          dishes: chefData.dishes || context.state.dishes,
          loading: false,
        });
      })
      .catch(function(err) {
        alert(err);
      });

  }

  addLocation() {
    this.toggleState('showLocationsModal');
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

  _addOrRemoveRestriction (restriction) {
    if (this.state.checkedRestrictions.includes(restriction)) {
      this.state.checkedRestrictions.splice(restriction, 1);
    } else {
      this.state.checkedRestrictions.push(restriction);
    }
  }

  // renderDishes() {
  //   console.log(Array.isArray(JSON.parse(this.state.dishes)));
  //   let dishArray = JSON.parse(this.state.dishes);
  //   return dishArray.map((dish, index) => {
  //     <View>
  //     <DishViewEntry
  //       dish={dish}
  //     />
  //     </View>
  //   });
  // }

  render() {
    return ( this.state.loading ? <ActivityIndicator size="large" style={styles.flex} /> :
      <ScrollView style={styles.textPadding}>
        <TextInput
          onChangeText={()=>{}}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Full Name"
          defaultValue={this.state.name}
        />
        <TextInput
          onChangeText={()=>{}}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          placeholder="Avatar Image URL (Optional)"
          defaultValue={this.state.imageURL}
        />
        {/* Implement some way for the user to edit locations */}
        <Text style={[styles.flex, styles.textCenter, styles.verticalMargins]}>Locations:</Text>
        {this.state.locations.map((location, index) =>
          <Text key={index}>{location}</Text>
        )}
        <Button
          title="Edit Locations"
          onPress={this.toggleState.bind(this, 'showLocationsModal')}
        />

        {/* Add buttons for toggling restrictions */}
        <Text style={[styles.flex, styles.textCenter, styles.verticalMargins]}>Restrictions:</Text>
        {this.state.checkedRestrictions.map((restriction) => {
          <Text key={restriction}>{restriction}</Text>
        })}
        <Button
          title="Edit Restrictions"
          onPress={this.toggleState.bind(this, 'showRestrictionsModal')}
        />

        <Text style={[styles.flex, styles.textCenter, styles.verticalMargins]}>Dishes:</Text>
    
        <Button
          title="Edit Dishes"
          onPress={this.toggleState.bind(this, 'showDishesModal')}
        />
        <Button
          title="Save Chef Profile"
          onPress={()=>alert('Under Construction')}
        />

        <Modal
          animationType="fade"
          transparent={false}
          visible={!!this.state.showLocationsModal}>
          <ScrollView>
            <Text>Locations Modal</Text>
            <TextInput
              onChangeText={(text) => this.setState({locations})}
            />
            {this.state.locations.map((location, index) =>
              <Text key={index}>{location}</Text>
            )}
            <Button
              title="Add Location"
              onPress={this.addLocation.bind(this)}
              />
            <Button
              title="Close"
              onPress={this.toggleState.bind(this, 'showLocationsModal')}
              />
          </ScrollView>
        </Modal>


        <Modal
          animationType="fade"
          transparent={false}
          visible={!!this.state.showRestrictionsModal}>
          <ScrollView contentContainerStyle={styles.modalStyle}>
            <Text style={styles.titleText}>Restrictions</Text>
            
            {this.state.restrictions.map((restriction) => 
              <CheckBox
                style={{backgroundColor: 'blue'}}
                checkboxStyle={styles.checkBox}
                key={restriction}
                label={restriction}
                labelStyle={styles.labelText}
                underlayColor={'#d3d3d3'}
                onChange={() => 
                  this._addOrRemoveRestriction(restriction)}
              />
            )}            

            <Button
              title="Close"
              onPress={this.toggleState.bind(this, 'showRestrictionsModal')}
              />
          </ScrollView>
        </Modal>

        <Modal
          animationType="fade"
          transparent={false}
          visible={!!this.state.showDishesModal}>
          <ScrollView style={[styles.textPadding, styles.modal]}>
            <Text>Your Dishes</Text>
            {this.state.dishes.map((dish, index) => {
              return (
                <View key={index}>
                  <Text>
                    {dish.name}
                  </Text>
                </View>
              )
            })}
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
  flex: {
    flex: 1,
  },
  textPadding: {
    padding: 8,
  },
  formInput: {
    flex: 1,
    height: 30,
  },
  textCenter: {
    textAlign: 'center',
  },
  verticalMargins: {
    marginVertical: 8,
  },
  modal: {
    paddingTop: 15,
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    textDecorationLine: 'underline'
  },
  labelText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'

  },
  modalStyle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginLeft: 35,
    marginTop: 30,
  },
  checkBox: {
    backgroundColor: '#EDEDED'
  }
});

function mapStateToProps(state) {
  return {
    currentChef: state.currentChef,
    currentUser: state.currentUser,
    chefLocation: state.chef.location,
    state,
  };
}

export default connect(mapStateToProps)(ChefActionsScreen);
