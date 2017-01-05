import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

import MultipleSelectionEntry from './MultipleSelectionEntry';

export default class MultipleSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: this.props.options || {}
    }
  }

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {makeEntries(this.state.options)}
      </View>
    );
  }
}

function makeEntries(options) {
  return options.map((option, index) =>
    <MultipleSelectionEntry
      key={index}
      name={option.name}
      value={option.value}
      selected={option.selected}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});
