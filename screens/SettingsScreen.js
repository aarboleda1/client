import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
} from 'react-native';

import {
  clearAuthToken,
  clearCurrentChef,
  clearCurrentUser,
} from '../actions/authActions';

import { serverURI } from '../config';

import Router from '../navigation/Router';

import { connect } from 'react-redux';

class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings',
    },
  }

  logout() {
    const rootNavigator = this.props.navigation.getNavigator('root');
    const context = this;
    fetch(`${serverURI}/logout`)
      .then(function(resp) {
        Alert.alert(
          `You've logged out`,
          'We hope to see you back soon!',
          [{text: 'For Sure!', onPress: () => {finishAuth()}}]
        );
      }).catch(function(err) {
        alert(err);
      });

    function finishAuth() {
      AsyncStorage.removeItem('AuthToken').then(function() {
        context.props.dispatch(clearAuthToken());
        context.props.dispatch(clearCurrentChef());
        context.props.dispatch(clearCurrentUser());
        rootNavigator.immediatelyResetStack([Router.getRoute('auth')]);
      }).catch(function(err) {
        alert(err);
      });
    }
  }

  chefActions() {
    this.props.navigator.push('chefActions');
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Button
          title="Chef Actions"
          onPress={this.chefActions.bind(this)}
        />

        <Button
          title="Logout"
          onPress={this.logout.bind(this)}
        />

      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(null)(SettingsScreen);
