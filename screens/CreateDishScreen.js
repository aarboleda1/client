import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  AsyncStorage,
  Text,
  TextInput,
  Image,
  Modal
} from 'react-native';
import Router from '../navigation/Router';
import { withNavigation } from '@exponent/ex-navigation';

import { addToDishList } from '../actions/dishActions';

import { connect } from 'react-redux';

import DishTextInput from '../components/DishTextInput';
import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';
import RestrictionSelectionEntryList from '../components/RestrictionSelectionEntryList';

import CheckBox from 'react-native-checkbox';

import { postDishToDB } from '../helpers/dishHelpers';

//this.props.currentUser '1' 1
//this.props.route..params
@withNavigation
class CreateDishScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dishName: '',
      dishDescription: '',
      image: '',
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
      cuisinesSelected: [],
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
    //also send this.the new dish1 to the store
    let { cuisinesSelected, dishName, dishDescription, image, price, checkedRestrictions, checkedCuisines, cuisines } = this.state;
    console.log(image, 'IS IMAGE before going to preview screen')
    var newlyCreatedDish = {
      name: dishName,
      text: dishDescription,
      image: image,
      price: price,
      restrictions: checkedRestrictions,
      cuisines: checkedCuisines
    }
    this.props.navigator.push(Router.getRoute('dishPreviewOnlyView', {dish: newlyCreatedDish}));
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

  _saveImageURL (imageURL) {
    this.setState({image: imageURL});
    console.log(this.state.image, 'IS IMAGE')
  };

  _addOrRemoveRestriction(restriction) {
    let update = this.state.checkedRestrictions;
  {/*RUN BY ZACK*/}
    // if (this.state.checkedRestrictions[restriction]) {
    //   delete update[restriction];
    // } else {
    //   update[restriction] = true;
    // }
    // this.setState({checkedRestrictions: update});
    if (this.state.checkedRestrictions.includes(restriction)) {
      this.state.checkedRestrictions.splice(restriction, 1)
    } else {
      this.state.checkedRestrictions.push(restriction);
    }
  }
  _addOrRemoveCuisine(cuisine) {
    if (this.state.checkedCuisines.includes(cuisine)) {
      this.state.checkedRestrictions.splice(cuisine, 1);
    } else {
      this.state.checkedRestrictions.push(cuisine);
    }
    let update = this.state.checkedCuisines;

    // if (this.state.checkedCuisines[cuisine]) {
    //   delete update[cuisine];
    // } else {
    //   update[cuisine] = true;
    // }
    // this.setState({checkedCuisines: update});
  }

  _saveToMenuList () {
    let { dishName, dishDescription, image, price, checkedRestrictions, checkedCuisines } = this.state;
    let newlyCreatedDish = {
    "name" : dishName,
    "text" : dishDescription,
    "image": "image",
    "price": price,
    "cuisines": checkedCuisines,
    "restrictions": checkedRestrictions
    }

    // Create a copy, otherwise a weird type error occurs when trying
    // to push to the currentDishList in stateA  c
    var newDishArray = this.props.dishes.dishList.slice(0);    
    var newDishList = newDishArray.push(newlyCreatedDish);    
    this.props.dispatch(addToDishList(newDishArray));
    
    let chefId = parseInt(this.props.currentChef)
    postDishToDB(newlyCreatedDish, chefId);
  };

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
            title="Input Image URL"
            onPress={this.toggleState.bind(this, 'inputImageURLModal')}
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
        <ListItem>
        <Button
          title="Preview Dish"
          style={{flexDirection: 'column', justifyContent: 'flex-end'}}
          onPress={this._goToPreviewDishScreen.bind(this)}
        />
        </ListItem>
        <ListItem>
        <Button
          title="Save To Menu"
          style={{flexDirection: 'column', justifyContent: 'flex-end'}}
          onPress={this._saveToMenuList.bind(this)}
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
        <ScrollView style={styles.textPadding}>

          <TextInput
            editable = {true}
            underlineColorAndroid="rgba(0,0,0,0)"
            style={styles.formInput}              
            maxLength={60}
            editable={true}
            onChangeText={(text) => this._saveDishDescription.call(this, text) }
            placeholder="Enter description of dish here!"
            multiline={true} 
            numberOfLines={4}
          />       
         <Button
            title="Save"
            onPress={this.toggleState.bind(this, 'describeDishModal')}
          />
        </ScrollView>
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
          <Text style={styles.titleText}>Restrictions</Text>

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

      {/*Modals to input a URL for dishes*/}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.inputImageURLModal}> 
          {/*REFACTOR THIS INTO A COMPONENT*/}
          <ScrollView style={styles.textPadding}>
            <TextInput
              editable = {true}
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.formInput}              
              maxLength={100}
              editable={true}
              onChangeText={(text) => this._saveImageURL.call(this, text) }
              placeholder="Input Image URL" 
              numberOfLines={4}
            />
          <Button
            style={{marginBottom: 'auto'}}
            title="Save"
            onPress={this.toggleState.bind(this, 'inputImageURLModal')}
          />          
          </ScrollView>
        </Modal>

      {/*PRICE MODAL*/}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setPriceModal}>
          <ScrollView style={styles.textPadding}>
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
      {/*CUISINES MODAL*/}
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setCuisinesModal}>
          <ScrollView
            contentContainerStyle={styles.modalStyle}
            style={styles.container}
            contentContainerStyle={[this.props.route.getContentContainerStyle()]}
          >
          <Text style={styles.titleText}>Cuisines</Text>

          {this.state.cuisines.map((cuisine) => 
            <CheckBox
              style={{backgroundColor: 'blue'}}
              checkboxStyle={styles.checkBox}            
              key={cuisine}
              label={cuisine}
              labelStyle={styles.labelText}
              underlayColor={'#d3d3d3'}                          
              checked={this.state.checkedCuisines[cuisine]}
              onChange={() => 
                this._addOrRemoveCuisine(cuisine)}              
            />
          )}     
          <Button
            title="Save"
            style={{flexDirection: 'column', justifyContent: 'flex-end'}}
            onPress={this.toggleState.bind(this, 'setCuisinesModal')}
          />
          </ScrollView>
        </Modal>

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
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
    textDecorationLine: 'underline',
    justifyContent: 'center'
  }  
};

//this.props.dish is now available in here thru redux store
function mapStateToProps(state) {
  return {
    dishList: state.dishList,
    dishes: state.dishes,
    currentUser: state.currentUser,
    currentChef: state.currentChef
  };
}
export default connect(mapStateToProps)(CreateDishScreen);
