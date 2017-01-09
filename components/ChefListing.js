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
          <View style={styles.chefDetails}>  
            <Text>{this.props.name}</Text>        
            <Text>{this.props.desc}</Text>
            <View style={styles.rating}>
              <Text>Rating: </Text>
              <Rating stars={this.props.rating}/>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  chefEntry: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  chefImage: {
    height: 48,
    width: 48,
    marginRight: 6,
    borderRadius: 24,
  },
  rating: {
    flexDirection: 'row',
  },
});

