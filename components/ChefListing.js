import React, { Component } from 'react';

import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
} from 'react-native';
import { withNavigation } from '@exponent/ex-navigation';

import Rating from './Rating';

@withNavigation
export default class ChefListing extends Component {
  constructor(props) {
    super(props);
  }

  viewChef() {
    /*
    REDUX: GET chef profile 
    show loading thing
    save chef profile to redux
    go to chef profile
    */
    let details = {
      img: this.props.img,
      name: this.props.name,
      desc: this.props.desc,
      rating: this.props.rating,
      id: this.props.id,
    }
    this.props.navigator.push('chefPageView', { details });
  }

  render() {
    return (
      <TouchableOpacity onPress={this.viewChef.bind(this)}>
        <View style={styles.chefEntry}>
          <Image style={styles.chefImage} source={{ uri: this.props.img }}/>
          <View>
            <Text style={styles.chefName}>{this.props.name}</Text>        
            <Text style={styles.chefDescription}>{this.props.desc}</Text>
            </View>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  chefEntry: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    // margin: 2,
 
    borderTopWidth: 3,
    backgroundColor: 'white'
  },
  chefImage: {
    height: 90,
    width: 110,
    margin: 2,
    marginRight: 6,
   
    borderColor: 'black',
    borderRadius: 2,
  },
  rating: {
    flexDirection: 'row',
  },
  chefName: {
    fontSize: 18,
    // alignSelf: 'flex-start',
    flexDirection: 'column',
    marginLeft: 3,
    marginTop: 2,
    fontWeight: '400',

  },
  chefDescription: {
    fontSize: 15,
    marginLeft: 3,
    marginTop: 10,
    flexDirection: 'row',
    width: 240,
  },
});

