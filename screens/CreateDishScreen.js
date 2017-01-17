import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
  Text,
  TextInput,
  Image,
  Modal,
  ActivityIndicator

} from 'react-native';
import Router from '../navigation/Router';
import { withNavigation } from '@exponent/ex-navigation';


import { connect } from 'react-redux';

import DishTextInput from '../components/DishTextInput';
import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';
import RestrictionSelectionEntryList from '../components/RestrictionSelectionEntryList';

import CheckBox from 'react-native-checkbox';


//this.props.route..params
@withNavigation
class CreateDishScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dishName: '',
      dishDescription: '',
      price: '',
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
      checkedRestrictions: [],
      checkedCuisines: []
    };
  }
    static route = {
      navigationBar: {
        title: 'Create New Dish',
      },
    }

  toggleState(key) {
    let update = {};
    update[key] = !this.state[key];
    this.setState(update);
  }
  _goToPreviewDishScreen () {
    this.props.navigator.push(Router.getRoute('dishPreviewOnlyView', this.state));
    //also send this.the new dish to the store 
  }

  _saveDishName (dishName) {
    this.setState({dishName: dishName});
  };

  _saveDishDescription (dishDescriptionText) {
    this.setState({dishDescription: dishDescriptionText})
  };

  _saveDishPrice (price) {
    this.setState({price: price});
  };

  _addOrRemoveRestriction(restriction) {
    let update = this.state.checkedRestrictions;

    if (this.state.checkedRestrictions[restriction]) {
      delete update[restriction];
    } else {
      update[restriction] = true;
    }
    this.setState({checkedRestrictions: update});
  }
  _addOrRemoveRestriction(cuisine) {
    let update = this.state.checkedCuisines;

    if (this.state.checkedCuisines[cuisines]) {
      delete update[cuisines];
    } else {
      update[cuisines] = true;
    }
    this.setState({checkedCuisines: update});
  }




  render () {
    return (
      <ScrollView style={styles.flex}>      
      {/*Buttons in CreateDishScreen which take user to each Modal*/}
        <ListItemSection>
          <Image 
            source={{uri: "http://i0.wp.com/wrbbradio.org/wp-content/uploads/2016/10/grey-background-07.jpg?zoom=2&fit=2560%2C1544"}}
            style={styles.imageStyle}
            backGroundColor
          />
        </ListItemSection>
        <ListItem>
          <Button 
            title="Give Dish a Title"
            onPress={this.toggleState.bind(this, 'showAddTitleModal')}
          />
        </ListItem>
        <ListItem>
          <Button 
            title="Describe Your Dish"
            onPress={this.toggleState.bind(this, 'describeDishModal')}
          />
        </ListItem>
        <ListItem>
          <Button 
            title="Set Price"
            onPress={this.toggleState.bind(this, 'setPriceModal')}
          />
        </ListItem>        
        <ListItem>
          <Button 
            title="Dietary Restrictions this may meet"
            onPress={this.toggleState.bind(this, 'setDietaryRestrictionsModal')}
          />
        </ListItem>        
        <ListItem>
          <Button 
            title="Set Cuisines"
            onPress={this.toggleState.bind(this, 'setCuisinesModal')}
          />
        </ListItem>

      {/*Modals to create dishes*/}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.showAddTitleModal}> 
          {/*REFACTOR THIS INTO A COMPONENT*/}
          <ScrollView style={styles.textPadding}>
            <TextInput
              editable = {true}
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.formInput}              
              maxLength={60}
              editable={true}
              onChangeText={(text) => this._saveDishName.call(this, text) }
              placeholder="Enter descriptive title of dish here!" 
              numberOfLines={4}
            />
          <Button
            style={{marginBottom: 'auto'}}
            title="Save"
            onPress={this.toggleState.bind(this, 'showAddTitleModal')}
          />          
          </ScrollView>
        </Modal>

      {/*Describing a Dish*/}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.describeDishModal}> 
          <TextInput
            editable = {true}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.formInput}              
            maxLength={60}
            editable={true}
            onChangeText={(text) => this._saveDishDescription.call(this, text) }
            placeholder="Enter description of dish here!" 
            numberOfLines={4}
          />       
         <Button
            title="Save"
            onPress={this.toggleState.bind(this, 'describeDishModal')}
          />     
        </Modal>
        
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setDietaryRestrictionsModal}>
          <ScrollView
            contentContainerStyle={styles.modalStyle}
            style={styles.container}
            contentContainerStyle={[this.props.route.getContentContainerStyle()]}
          >            
          {this.state.restrictions.map((restriction) => 
            <CheckBox
              style={{backgroundColor: 'blue'}}
              checkboxStyle={styles.checkBox}
              key={restriction}
              label={restriction}
              labelStyle={styles.labelText}
              underlayColor={'#d3d3d3'}
              checked={this.state.checkedRestrictions[restriction]}
              onChange={() => 
                this._addOrRemoveRestriction(restriction)}
            />
          )}          
          <Button
            title="Save"
            onPress={this.toggleState.bind(this, 'setDietaryRestrictionsModal')}
          />
          </ScrollView>          
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setPriceModal}>
          <ScrollView>
          <DishTextInput
            onChangeText={(priceText)=>{ this._saveDishPrice.call(this, priceText)}}
            style={styles.formInput}
            placeholder="Enter a price for dish here!"
            defaultValue={this.props.dishes.dish.price}
            numberOfLines={4}
          />           
          <Button
            title="Save"
            onPress={this.toggleState.bind(this, 'setPriceModal')}
          />          
          </ScrollView> 
        </Modal>

        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setCuisinesModal}>
          {this.state.cuisines.map((cuisine) => 
            <CheckBox
              style={{backgroundColor: 'blue'}}
              checkboxStyle={styles.checkBox}
              key={restriction}
              label={restriction}
              labelStyle={styles.labelText}
              underlayColor={'#d3d3d3'}
              checked={this.state.checkedCuisine[cuisine]}
              onChange={() => 
                this._addOrRemoveCuisine(restriction)}
            />
          )}            
          <Button
            title="Save"
            style={{flexDirection: 'column', justifyContent: 'flex-end'}}
            onPress={this.toggleState.bind(this, 'setCuisinesModal')}
          />
        </Modal>

        <Button
          title="Preview Dish"
          style={{flexDirection: 'column', justifyContent: 'flex-end'}}
          onPress={this._goToPreviewDishScreen.bind(this)}
        />
      </ScrollView>
    ) 
  };
}

const styles = {
  flex: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingTop: 15
  },
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  imageStyle: {
    height: 200,
    flex: 1,
    width: null
  },
  imageContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  formInput: {
    flex: 1,
    height: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 2
  },
  textPadding: {
    padding: 20,
  },
  dishModalOptionView: {
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
    paddingTop: 20
  },
  checkBox: {
    backgroundColor: '#EDEDED'
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
};

//this.props.dish is now available in here thru redux store
function mapStateToProps(state) {
  return {
    dishList: state.dishList,
    dishes: state.dishes,
    state,
  };
}

export default connect(mapStateToProps)(CreateDishScreen);
