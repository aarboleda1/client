import React from 'react';
import {Button, View, StyleSheet, Text, TouchableHighlight, Dimensions } from 'react-native';
import { Components } from 'exponent';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  a: {
    borderColor: 'black',
    borderWidth: 3,
    backgroundColor: '#2d2d2c',
    // overflow: 'hidden',
    margin: 1,
    padding: 2,
    height: WINDOW_HEIGHT / 11,
    width: WINDOW_WIDTH / 5,
    alignItems: 'center',
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',

  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontWeight: '300',
  },
});


class SquareRestrictions extends React.Component {
  constructor(props) {
      super(props);
  }

  render(){
    return (
      <TouchableHighlight title={this.props.name} style={styles.a} >
          <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableHighlight>
    )
  }
}
export default SquareRestrictions;