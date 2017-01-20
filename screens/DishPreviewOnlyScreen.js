import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  AsyncStorage,
  Text,
  Image,
  Dimensions
} from 'react-native';

import { connect } from 'react-redux';

import ListItem from '../components/ListItem';
import ListItemSection from '../components/ListItemSection';
import CuisineSelectionEntry from '../components/CuisineSelectionEntry';

import windowDimensions from '../constants/Layout';

class DishPreviewOnlyScreen extends Component {
  constructor (props) {
    super(props)
  };
  static route = {
    navigationBar: {
      title: 'Preview',
    },
  }
  // REFACTOR, DOING EXACT SAME THINGS
  _renderRestrictions () {
    let { listItemText, textInput } = styles;
    let restrictions = this.props.route.params.dish.restrictions;
    if (!this.props.route.params.dish.restrictions) {
      return (
        <View style={ styles.listItemText }>
          <Text style={ textInput }>{'none'}</Text>
        </View>
      )
    } else {
      return restrictions.map((restriction) => {
        return (
          <View style={ styles.listItemText }>
            <Text>
              { restriction }
            </Text>
          </View>
        )
      });
    }
  };

  _renderCuisines () {
    let { listItemText, textInput } = styles;
    let cuisines = this.props.route.params.dish.cuisines;
    if (!cuisines) {
      return (
        <View style={ listItemText }>
          <Text style={ textInput }>{'none'}</Text>
        </View>        
      ) 
    } else {
      return cuisines.map((cuisine) => {
        return (
          <View style={ listItemText }>
            <Text>
              { cuisine }
            </Text>
          </View>
        )
      });
    }
  }
  render () {
    let {height, width} = Dimensions.get('window');
    let { name, image, text, price } = this.props.route.params.dish
    let { listItemTextDescription, listTextContainerStyling, textInput, listItemText, headerTextStyle, headerContentStyle, textContainerStyling, imageStyle, dishPropertyName} = styles;
    return (
    <ListItem>
      <ListItemSection style={{flexDirection: 'column'}}>
        <View style={ headerContentStyle }>
          <Text style={ headerTextStyle }>{ name }</Text>
        </View>
      </ListItemSection>

      <ListItemSection>
          <Image
            source={{uri: image}}
            style={imageStyle}
          />
      </ListItemSection>

      <ListItemSection>
        <View style={ textContainerStyling }>
          <Text style={ dishPropertyName }>{ 'Description: ' }</Text>
        </View>
        <View style={ listItemTextDescription }>
          <Text style={ textInput }>{text}</Text>
        </View>            
      </ListItemSection>
      
      <ListItemSection>
        <View style={ textContainerStyling }>
          <Text style={dishPropertyName}>{'Price: '}</Text>
        </View>
        <View style={ listItemText }>
          <Text style={ textInput }>        
            {price}
          </Text>
        </View>
      </ListItemSection>

      <ListItemSection>
        <View style={ textContainerStyling }>
          <Text style={ dishPropertyName }>{ 'Cuisines: '}</Text>
        </View>
        <View style={ listTextContainerStyling }>
          {this._renderCuisines()}
        </View>
      </ListItemSection>
             
      <ListItemSection>
        <View style={ textContainerStyling }>
          <Text style={ dishPropertyName }>{ 'Restrictions: '}</Text>
        </View>
        <View style={ listTextContainerStyling }>
          {this._renderRestrictions()}
        </View>
      </ListItemSection>     
    </ListItem>
    ) 
  }
};





function mapStateToProps(state) {
  return {
    dishList: state.dishList,
    dishes: state.dishes,
    name: state.dishes.name,
    state,
  };
}

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 25,
    paddingLeft: 13,
    color: 'black',
    fontWeight: '600',    
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  dishPropertyName: {
    marginLeft: 10,
    fontSize: 25,
    fontWeight: '300'
  },
  textContainerStyling: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  entry: {
    borderBottomWidth: 1
  },
  entryText: {
    textAlign: 'center',
    fontSize: 20,
    flex: 1,
    height: 50,
    padding: 10,
  },
  listItemText: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    width: 60,
    height: 50,
    marginLeft: 2
  },
  listItemTextDescription: {
    flexDirection: 'row', 
    justifyContent: 'flex-start', 
    alignItems: 'center', 
    width: 200,
    height: 50,
    marginLeft: 2
  },
  textInput: {
    fontSize: 18,
    fontWeight: '300'
  },
  listTextContainerStyling: {
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  }
}


// map state to props to inherit
export default connect(mapStateToProps)(DishPreviewOnlyScreen);


