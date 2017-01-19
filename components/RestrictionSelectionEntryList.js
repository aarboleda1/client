import React from 'react';
import {View} from 'react-native';
import RestrictionSelectionEntry from './RestrictionSelectionEntry';

const RestrictionSelectionEntryList = (props) => {  
  return (
    <View>
      <RestrictionSelectionEntry name="Dairy" />
      <RestrictionSelectionEntry name="Eggs" />
      <RestrictionSelectionEntry name="Halal" />
      <RestrictionSelectionEntry name="Kosher" />
      <RestrictionSelectionEntry name="Tree Nuts" />
      <RestrictionSelectionEntry name="Peanuts" />
      <RestrictionSelectionEntry name="Wheat" />
      <RestrictionSelectionEntry name="Soy" />
      <RestrictionSelectionEntry name="Gluten" />
      <RestrictionSelectionEntry name="Seafood" />
      <RestrictionSelectionEntry name="Shellfish" />
      <RestrictionSelectionEntry name="Vegan" />
      <RestrictionSelectionEntry name="Vegetarian" />      
    </View>
  ); 
};

export default RestrictionSelectionEntryList;