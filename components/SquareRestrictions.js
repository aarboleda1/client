import React from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableHighlight,
  Dimensions,
} from 'react-native';

import { connect } from 'react-redux';

import { toggleSearchRestriction } from '../actions/searchActions';

const WINDOW_WIDTH = Dimensions.get('window').width;
const WINDOW_HEIGHT = Dimensions.get('window').height;

const styles = StyleSheet.create({
  a: {
    borderColor: 'black',
    borderWidth: 3,
    backgroundColor: '#2d2d2c',
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

  _toggleRestriction() {
    this.props.dispatch(toggleSearchRestriction(this.props.name));
  }

  render(){
    return (
      <TouchableHighlight 
      title={this.props.name} 
      style={[styles.a, this.props.restrictions[this.props.name] ? {backgroundColor: '#D62D20'} : null]}
      onPress={this._toggleRestriction.bind(this)} >
          <Text style={styles.buttonText}>{this.props.name}</Text>
      </TouchableHighlight>
    )
  }
}

function mapStateToProps(state) {
  return {
    restrictions: state.search.restrictions,
  };
}

export default connect(mapStateToProps)(SquareRestrictions);
