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

import { toggleSearchPrice } from '../actions/searchActions';


class PriceSelectionEntry extends React.Component {
  constructor(props) {
    super(props);
  }

  _toggleSelection() {
    this.props.dispatch(toggleSearchPrice(this.props.value));
  }

  render() {
    return (
      <TouchableOpacity onPress={this._toggleSelection.bind(this)}>
        <View style={[styles.entry, this.props.style]}>
          <Text style={styles.entryText}>{this.props.name}</Text>
          <View style={styles.selected}>
            {this.props.prices[this.props.value] ?
              <View style={styles.checkMark}>
                <FontAwesome
                  name="check"
                  size={16}
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
    flex: 0.99,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 4,
  },
  entryText: {
    textAlign: 'center',
  },
  selected: {
    flex: 0.01,
  },
  checkMark: {
    position: 'absolute',
    right: 2,
    bottom: 1,
    backgroundColor: 'rgba(0,0,0,0)',
  }
});

function mapStateToProps(state) {
  return {
    prices: state.search.prices,
  }
}

export default connect(mapStateToProps)(PriceSelectionEntry);
