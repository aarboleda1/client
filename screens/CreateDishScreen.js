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

import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';


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
          <TextInput
            placeholder="Full Name"
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={(text)=> console.log(text)}
          />
          <Button
            style={{marginBottom: 'auto'}}
            title="Save"
            onPress={this.toggleState.bind(this, 'showAddTitleModal')}
          />          
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.describeDishModal}> 
         <Button
            title="Save"
            onPress={this.toggleState.bind(this, 'describeDishModal')}
          />          
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setDietaryRestrictionsModal}> 
         <Button
            title="Save"
            onPress={this.toggleState.bind(this, 'setDietaryRestrictionsModal')}
          />          
        </Modal>
        <Modal
          animationType={"fade"}
          transparent={false}
          visible={!!this.state.setPriceModal}> 
          <Button
            title="Save"
            onPress={this.toggleState.bind(this, 'setPriceModal')}
          />          
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
