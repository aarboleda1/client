import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  Button,
} from 'react-native';

export default class ConfirmEventScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Confirm Event',
    }
  }
  constructor(props) {
    super(props);
  }

  doConfirm() {
    const rootNavigator = this.props.navigation.getNavigator('root');
    rootNavigator.navigationContext.performAction(({ tabs, stacks }) => {
      tabs('main').jumpToTab('upcoming');
      stacks('search').popToTop();
    });
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        >
        {this.props.route.params.dishes.map((number, index) => ( !!!!!!!!!!!!!!!!!!!!!!!!!!!!
            <Text key={index}>Dish #{number}</Text>
        ))}
        <Text>Quantity of Each: {this.props.route.params.quantity}</Text>
        <Button
          title="Confirm"
          onPress={this.doConfirm.bind(this)}
        />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  contentContainer: {

  },
});
