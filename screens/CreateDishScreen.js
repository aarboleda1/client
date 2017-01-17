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


//this.props.route..params
@withNavigation
class CreateDishScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
      name: '',
      text: '',
      price: '',
      restrictions: [],
      cuisines: []
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

  _saveTitle () {
    this.toggleState.apply(this, 'showAddTitleModal');
    // this.props.dispatch(setMapContext('chefActions'));
  };

  _goToPreviewDishScreen () {
    //get the current dish in redux store
    // this.props.navigator.push(Router.getRoute('dishPreviewOnlyView'));
    // this.props.navigator.push('chefPageView');
    this.props.navigator.push('dishPreviewOnlyView');

  }

  _saveDishName (dishName) {
    this.setState({name: dishName});
    this.props.dispatch(updateDishName(dishName));
  };

  _saveDishDescription (dishDescriptionText) {
    this.setState({text: dishDescriptionText})
    this.props.dispatch(updateDishText(dishDescriptionText));
  };

  _saveDishPrice () {

  };

  _saveDishRestrictions () {

  };

  _saveDishCuisines () {

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
          <ScrollView style={styles.textPadding}>
            <DishTextInput
              onChangeText={(text)=>{ this._saveDishName.bind(this, text) }}
              style={styles.formInput}
              placeholder="Enter descriptive title of dish here!"
              defaultValue={this.props.dishes.dish.title}
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
          <DishTextInput
            onChangeText={(descriptionText)=>{ this._saveDishDescription.bind(this, descriptionText)}}
            style={styles.formInput}
            placeholder="Give a create description your dish here!"
            defaultValue={this.props.dishes.dish.text}
            numberOfLines={4}
          />        
         <Button
            title="Save"
            onPress={this._saveTitle.bind(this)}
          />     
        </ScrollView>      
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setDietaryRestrictionsModal}>
          <ScrollView
            style={styles.container}
            contentContainerStyle={[this.props.route.getContentContainerStyle()]}
          >
          <RestrictionSelectionEntryList/> 
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
            onChangeText={(priceText)=>{ this._saveDishPrice.bind(this, priceText)}}
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
  }
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
