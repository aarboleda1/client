import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Colors from '../constants/Colors';

import { connect } from 'react-redux';

import { setSearchCuisine } from '../actions/searchActions';


class CuisineSelectionEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  _toggleSelection() {
    this.props.dispatch(setSearchCuisine(this.props.name));
  }

  render() {
    return (
      <TouchableOpacity onPress={this._toggleSelection.bind(this)}>
        <View style={styles.entry}>
          <Text style={styles.entryText}>{this.props.name}</Text>
          <View style={styles.selected}>
            {this.props.selected === this.props.name ? 
              <View style={styles.checkMark}>
                <FontAwesome
                  name="check"
                  size={30}
                  color={Colors.checkMark}
                />
              </View>
              : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
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
  selected: {
    flex: 0.01,
  },
  checkMark: {
    position: 'absolute',
    right: 2,
    bottom: 12,
    backgroundColor: 'rgba(0,0,0,0)',
  }
});

function mapStateToProps(state) {
  return {
    selected: state.search.cuisine,
  };
}

export default connect(mapStateToProps)(CuisineSelectionEntry);
