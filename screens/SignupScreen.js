import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  TextInput,
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
        <TextInput
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          maxLength={64}
          autoCapitalize="none"
          placeholder="E-Mail"
          keyboardType="email-address"
        />
        <TextInput
            style={styles.formInput}
            underlineColorAndroid="rgba(0,0,0,0)"
            maxLength={32}
            autoCapitalize="none"
            placeholder="Password"
            secureTextEntry={true}
          />
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
  formInput: {
    flex: 1,
    height: 30,
  }
});
