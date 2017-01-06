import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  Alert,
  TextInput,
} from 'react-native';

import Router from '../navigation/Router';

export default class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Login',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      verifyPassword: '',
    }
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
            autoCapitalize="words"
            placeholder="Full Name"
          />
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
          <TextInput
            style={styles.formInput}
            underlineColorAndroid="rgba(0,0,0,0)"
            maxLength={32}
            autoCapitalize="none"
            placeholder="Verify Password"
            secureTextEntry={true}
          />
        <Button
          onPress={this._fakeLogin.bind(this)}
          title="Fake Login!"
        />
      </ScrollView>
    );
  }

  _fakeLogin() {
    const rootNavigator = this.props.navigation.getNavigator('root');
    function finishAuth() {
      rootNavigator.immediatelyResetStack([Router.getRoute('rootNavigation', {authed: true})]);
    }

    Alert.alert(
      'You pretended to Log In!',
      'Real user auth will be implemented soon!',
      [
        {text: 'Ok...', onPress: () => {finishAuth()}},
      ]
    );
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
