import React from 'react';
import {
  AppRegistry,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableHighlight, 
  View} from 'react-native';

import RestrictionSelectionEntry from '../components/RestrictionSelectionEntry';
import SquareSelection from '../components/SquareRestrictions';

import Panel from './test2';  // Step 1

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

class Panels extends React.Component {
  
  render() {
    return (  //Step 2
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Order Specification </Text>
        
        <Panel title="Select Cuisine Type">
            <RestrictionSelectionEntry name="Asian" />
            <RestrictionSelectionEntry name="Italian" />
            <RestrictionSelectionEntry name="Spanish" />
            <RestrictionSelectionEntry name="Mediterranean" />
            <RestrictionSelectionEntry name="Gluten" />
        </Panel>
        
        <Panel title="Select Restrictions">
          
          <Text style={{fontSize : 20}}>Allergens</Text>

          <View style={styles.square}>
            <SquareSelection name="Dairy"  />
            <SquareSelection name="Eggs" />
            <SquareSelection name="Peanuts" />
            <SquareSelection name="Tree Nuts" />
            <SquareSelection name="Gluten" />
            <SquareSelection name="Wheat" />
            <SquareSelection name="Soy" />
            <SquareSelection name="Seafood" />
            <SquareSelection name="Shellfish" />
          </View>
          
          <Text style={{fontSize : 20, paddingTop: 10}}>Food</Text>
          
          <View style={styles.square}>
          <SquareSelection name="Halal" />
          <SquareSelection name="Kosher" />
          <SquareSelection name="Vegetarian" />
          <SquareSelection name="Vegan" />
       
          </View>

        </Panel>

        <TouchableHighlight style={styles.button}>
          
          <Text style={styles.buttonText}>
            Set Location
          </Text>
        </TouchableHighlight>
                
      </ScrollView>
    );
  }
};

var styles = StyleSheet.create({
  container: {
    flex            : 1,
    backgroundColor : '#eae9e8',
    paddingTop      : 30,

  },
  text: {
    fontSize: 25,
    paddingLeft: 13,
    color: 'black',
    fontWeight: '600',
  },
  button: {
    borderColor: '#211408',
    borderWidth: 4,
    backgroundColor: '#333',
    margin: 20,
    height: WINDOW_HEIGHT / 12,
    width: WINDOW_WIDTH / 1.1,
    alignItems: 'center',
    justifyContent: 'center',
    // flex: 1,
    // flexDirection: 'column',
  },
  buttonText: {
    color: '#FAFAFA',
    // flex: 1,
    fontSize: 21,
    fontWeight: '500',
  },
  square: {
    flex: 1,
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: 1,
  },
});

export default Panels;