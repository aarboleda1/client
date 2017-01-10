import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  AsyncStorage,
} from 'react-native';
import {
  ExponentConfigView,
} from '@exponent/samples';

import { serverURI } from '../config';

import Router from '../navigation/Router';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings',
    },
  }

  logout() {
    const rootNavigator = this.props.navigation.getNavigator('root');
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
        rootNavigator.immediatelyResetStack([Router.getRoute('auth')]);
      }).catch(function(err) {
        alert(err);
      });
    }
  }

  chefOptions() {
    this.props.navigator.push('profile', {isChef: true});
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

        <Button
          title="Chef Options"
          onPress={this.chefOptions.bind(this)}
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
