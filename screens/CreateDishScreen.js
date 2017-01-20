import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Button,
  Text,
  TextInput,
  Image,
  Modal,
  Alert,
  TouchableHighlight,
  Dimensions  
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


@withNavigation
class CreateDishScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      dishName: '',
      dishDescription: '',
      image: '',
      price: '',
      checkedRestrictions: [],
      checkedCuisines: [],
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
      isPictureInserted: false
    };
  }
    static route = {
      navigationBar: {
        title: 'Create New Dish',
      },
    }

  toggleState (key) {
    let update = {};
    update[key] = !this.state[key];
    this.setState(update);
  }
  _goToPreviewDishScreen () {
    let { cuisinesSelected, dishName, dishDescription, image, price, checkedRestrictions, checkedCuisines, cuisines } = this.state;
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
    let isInserted = !this.state.isPictureInserted;
    this.setState({isPictureInserted: isInserted})
  };

  _addOrRemoveRestriction(restriction) {
    // let update = this.state.checkedRestrictions;
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
    // let update = this.state.checkedCuisines;
    if (this.state.checkedCuisines.includes(cuisine)) {
      this.state.checkedRestrictions.splice(cuisine, 1);
    } else {
      this.state.checkedRestrictions.push(cuisine);
    }
    // if (this.state.checkedCuisines[cuisine]) {//   delete update[cuisine];
    // } else {
    //   update[cuisine] = true;
    // }
    // this.setState({checkedCuisines: update});
  }

  _saveToMenuList () {
    let context = this;
    let { dishName, dishDescription, image, price, checkedRestrictions, checkedCuisines } = this.state;
    let newlyCreatedDish = {
    "name" : dishName,
    "text" : dishDescription,
    "image": image,
    "price": price,
    "cuisines": checkedCuisines,
    "restrictions": checkedRestrictions
    }


    // Create a copy, otherwise a weird type error occurs when trying
    // to push to the currentDishList in stateA  c
    var newDishArray = this.props.dishes.dishList.slice(0);    
    var newDishList = newDishArray.push(newlyCreatedDish);    
    this.props.dispatch(addToDishList(newDishArray));
    
    let chefId = parseInt(this.props.currentChef);
    let resetCameraIcon = require('../Images/camera-icon-33.png');
    postDishToDB(newlyCreatedDish, chefId);
    Alert.alert(
      'Dish Saved!',
      '',
      [{text: 'Done', onPress: () => {
        context.setState({
          dishName: '',
          dishDescription: '',
          price: '',
          checkedCuisines: [],
          checkedRestrictions: []
        })
      }}])   
  };

  render () {
    let { alignItemsInBar } = styles;
    let cameraIcon = require('../Images/camera-icon-33.png');
    let image = this.state.image ? {uri: this.state.image} : require('../Images/camera-icon-33.png');
    let dishDescription = this.state.dishDescription ? 'Dish Description ' + this.state.dishDescription : 'Dish Description';
    return (
      <ScrollView style={ styles.flex }>      
      {/*Buttons in CreateDishScreen which take user to each Modal*/}
        <ListItemSection>
          <Image 
            source={ image }
            style={ styles.imageStyle }
          />
        </ListItemSection>
        <ListItem>
          <View style={ alignItemsInBar }>
           <Button 
              title={ this.state.dishName ? 'Edit Title' : 'Add Title' }
              onPress={this.toggleState.bind(this, 'showAddTitleModal')}
            />  
            {this.state.dishName ? <Text>{this.state.dishName}</Text> : null}  
          </View>      
        </ListItem>

        <ListItem>
          <View style={ alignItemsInBar }>
            <Button 
              title={ this.state.dishDescription ? 'Edit Description' : 'Add Description' }
              onPress={ this.toggleState.bind(this, 'describeDishModal') }
            />
            {this.state.dishDescription ? <Text>{this.state.dishDescription}</Text> : null}  
          </View>
        </ListItem>
        <ListItem>
          <View style={ alignItemsInBar }>
            <Button 
              title={this.state.isPictureInserted ? 'Edit Dish Image' : 'Add Dish Image'} 
              onPress={ this.toggleState.bind(this, 'inputImageURLModal') }
            />
            {this.state.isInserted ? <Text>{'Edit Image'}</Text> : null}
          </View>  
        </ListItem>
        <ListItem>
          <View style={ alignItemsInBar }>
            <Button 
            title={ this.state.price ? 'Edit Price' : 'Add Price' }
            onPress={this.toggleState.bind(this, 'setPriceModal')}
            />
            { this.state.price ? <Text>{this.state.price}</Text> : null }
          </View>
        </ListItem>        
        <ListItem>        
          <Button 
            title={ this.state.checkedRestrictions.length  ? 'Edit Restrictions': 'Add restrictions'}
            onPress={this.toggleState.bind(this, 'setDietaryRestrictionsModal')}
          />
        </ListItem>        
        <ListItem>
          <Button 
            title={ this.state.checkedCuisines.length > 0 ? 'Edit Cuisines': 'Add Cuisines'}
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
          color='#d9534f'
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
              value={this.state.dishName ? this.state.dishName : null}
            />
          <Button
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
            value={this.state.dishDescription ? this.state.dishDescription : null}
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
              checkboxStyle={styles.checkboxStyle}
              labelStyle={styles.labelStyle}
              key={restriction}
              label={restriction}
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
          <ScrollView style={styles.textPadding}>
            <TextInput
              editable = {true}
              underlineColorAndroid="rgba(0,0,0,0)"
              style={styles.formInput}              
              maxLength={250}
              editable={true}
              onChangeText={ (text) => this._saveImageURL.call(this, text) }
              placeholder="Input Image URL" 
              numberOfLines={15}
              value={ this.state.image ? this.state.image : null }
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
            defaultValue={ this.props.dishes.dish.price }
            numberOfLines={ 4 }
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
              checkboxStyle={styles.checkboxStyle}
              labelStyle={styles.labelStyle}        
              key={cuisine}
              label={cuisine}
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

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

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
  checkboxStyle: {
    margin: 7,
    marginLeft: 15, 
    margin: -1,
  },
  labelStyle: {
    fontSize: 25,
    color: 'black',
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
    fontSize: 25,
    textDecorationLine: 'underline',
    justifyContent: 'center',
  },
  alignItemsInBar: { 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  buttonBackgroundColor: {
    backgroundColor: '#d9534f',    
  },
  test: {
    margin: 8,
    height: WINDOW_HEIGHT / 14,
    width: WINDOW_WIDTH / 1.6,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  saveStyle: {
    backgroundColor: '#d9534f',
  },
  saveText: {
    fontSize: 22,
    fontWeight: '700',
    color: 'black',
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
