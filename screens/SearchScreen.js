import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TextInput,
  View
} from 'react-native';
import {
  FontAwesome,
} from '@exponent/vector-icons';

import Colors from '../constants/Colors';

export default class SearchScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  static route = {
    navigationBar: {
      title: 'Search',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <View style={styles.searchBarContainer}>
          <FontAwesome
            style={styles.searchBarIcon}
            name="search"
            size={16}
            color={Colors.tabIconDefault}
          />
          <TextInput style={styles.searchBarInput} underlineColorAndroid="rgba(0,0,0,0)" />
        </View>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
  searchBarContainer: {
    flex: 1,
    left: -8,
    borderColor: 'black',
    flexDirection: 'row',
  },
  searchBarInput: {
    flex: 1,
    height: 30,
    borderWidth: 1,
    paddingLeft: 24,
  },
  searchBarIcon: {
    left: 20,
    top: 6,
  }
});
