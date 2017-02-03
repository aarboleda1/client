// WIP, maybe not needed
import React, { Component } from 'react';

import {
  Text,
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

export default class TabContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: <Text>About</Text>,
    };
  }

  _changeTab(tabName) {
    this.setState({
      tabView: <Text>{tabName}</Text>
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.tabs}
        contentContainerStyle={styles.tabsContentContainer}>
        <View style={styles.tabBar}>
          <Text onPress={this._changeTab.bind(this, 'About')}>About</Text>
          <Text onPress={this._changeTab.bind(this, 'Menu')}>Menu</Text>
          <Text onPress={this._changeTab.bind(this, 'Ratings')}>Ratings</Text>
          <Text onPress={this._changeTab.bind(this, 'Message')}>Message</Text>
        </View>
        <View style={styles.tabView}>{this.state.tabView}</View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabs: {
    flex: 1,
  },
  tabsContentContainer: {
  },
  tabBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  tabView: {
    flex: 1,
  }
});
