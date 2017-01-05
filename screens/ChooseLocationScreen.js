import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text
} from 'react-native';

export default class ChooseLocationScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Choose Location',
    },
  }

  render() {
        // style={styles.container} this is causing the top bar to not render consistently
    return (
      <ScrollView
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text>Map goes here</Text>
      </ScrollView>
    );
  }

}

const styles = StyleSheet.create({
  container: {
  },
});
