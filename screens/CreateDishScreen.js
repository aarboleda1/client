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


import { connect } from 'react-redux';

import DishTextInput from '../components/DishTextInput';
import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';
import RestrictionSelectionEntryList from '../components/RestrictionSelectionEntryList';


//this.props.route..params
class CreateDishScreen extends Component {
  constructor (props) {
    super(props);
    this.state = {
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
              onChangeText={()=>{{/*FILL IN HERE SETTING STATE OF DISHTEXT*/}}}
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
            onChangeText={()=>{{/*SEND THIS STATE TO THE REDUX STORE FOR DISHES OF DISHTEXT*/}}}
            style={styles.formInput}
            placeholder="Give a create description your dish here!"
            defaultValue={this.props.dishes.dish.text}
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
