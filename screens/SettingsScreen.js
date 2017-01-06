import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
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
    function finishAuth() {
      rootNavigator.immediatelyResetStack([Router.getRoute('auth')]);
    }

    Alert.alert(
      'You pretended to Log Out!',
      'Real user auth will be implemented soon!',
      [
        {text: 'Ok...', onPress: () => {finishAuth()}},
      ]
    );
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
