import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

import Router from '../navigation/Router';

export default class SignupScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Signup',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Button
          onPress={this._fakeSignup.bind(this)}
          title="Fake Signup!"
        />
      </ScrollView>
    );
  }

  _fakeSignup() {
    const rootNavigator = this.props.navigation.getNavigator('root');

    function finishAuth() {
      rootNavigator.immediatelyResetStack([Router.getRoute('rootNavigation', {authed: true})]);
    }

    Alert.alert(
      'You pretended to Sign Up!',
      'Real user auth will be implemented soon!',
      [
        {text: 'Ok...', onPress: () => finishAuth()},
      ]);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
