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

import Router from '../navigation/Router';

export default class SettingsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Settings',
    },
  }

  logout() {
    const rootNavigator = this.props.navigation.getNavigator('root');
    fetch('http://localhost:3000/logout/')
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

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>

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
