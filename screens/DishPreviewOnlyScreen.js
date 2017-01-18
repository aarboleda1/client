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
    let restrictions = this.props.route.params.dish.restrictions;
    if (!this.props.route.params.dish.restrictions) {
      return (
        <View style={{borderColor: 'blue', borderWidth: 2, width: 50, height: 50}}>
          <Text style={{fontStyle: 'italic'}}>{'none'}</Text>
        </View>
      )
    } else {
      return restrictions.map((restriction) => {
        return (
          <View style={{borderColor: 'blue', borderWidth: 2, width: 50, height: 50, flexDirection: 'row'}}>
            <Text>
              { restriction }
            </Text>
          </View>
        )
      });
    }
  };

  _renderCuisines () {
    let cuisines = this.props.route.params.dish.cuisines;
    if (!cuisines) {
      return (
        <View style={{width: 20, height: 20, flexDirection: 'row'}}>
          <Text style={{fontStyle: 'italic'}}>{'none'}</Text>
        </View>        
      ) 
    } else {
      return cuisines.map((cuisine) => {
        return (
          <View style={{width: 50, height: 50}}>
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
    let { headerTextStyle, headerContentStyle, imageStyle, dishPropertyName} = styles;
    return (
    <ListItem>
      <ListItemSection>
        <View style={headerContentStyle}>
          <Text style={ headerTextStyle }>{ name }</Text>
        </View>
      </ListItemSection>
      <ListItemSection>
        <View>
          <Image
            source={{uri: image}}
            style={{height: height / 3, width: width}}
          />
        </View>
      </ListItemSection>
      <ListItemSection style={{flexFlow: 'row wrap', justifyContent: 'space-around'}}>
        <Text style={ dishPropertyName }>{ 'Description' }</Text>
        <Text>{text}</Text>
      </ListItemSection>
      <ListItemSection>
        <Text style={dishPropertyName}>{'Price: '}</Text>
        <Text>
          {price}
        </Text>
      </ListItemSection> 
      <ListItemSection>
        <Text style={dishPropertyName}>{ 'Cuisines: '}</Text>
        <View>
          <Text>
            {this._renderCuisines()}
          </Text>
        </View>
      </ListItemSection>       
      <ListItemSection>
        <Text style={dishPropertyName}>{ 'Restrictions: '}</Text>
        <Text>
          {this._renderRestrictions()}
        </Text>
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
    fontSize: 18
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
    fontSize: 14,
    fontWeight: 'bold'
  },
  textContainerStyling: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  }
}


// map state to props to inherit
export default connect(mapStateToProps)(DishPreviewOnlyScreen);


