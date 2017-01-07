import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Text,
  Alert,
  TextInput,
  AsyncStorage,
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
      email: '',
      password: '',
    }
  }

  update(key, value) {
    let updateState = {};
    updateState[key] = value;
    this.setState(updateState);
  }

  render() {
    return (
      <ScrollView
        style={[styles.container, styles.textPadding]}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <TextInput
          onChangeText={this.update.bind(this, 'email')}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          maxLength={64}
          autoCapitalize="none"
          placeholder="E-Mail"
          keyboardType="email-address"
        />
        <TextInput
          onChangeText={this.update.bind(this, 'password')}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          maxLength={32}
          autoCapitalize="none"
          placeholder="Password"
          secureTextEntry={true}
        />
        <Button
          onPress={this._doLogin.bind(this)}
          title="Login"
        />
      </ScrollView>
    );
  }

  _doLogin() {
    const rootNavigator = this.props.navigation.getNavigator('root');

    let loginData = {
      email: this.state.email,
      password: this.state.password,
    }

    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    }).then(resp => resp.json())
    .then(function(data) {
      return AsyncStorage.setItem('AuthToken', data.AuthToken);
    }).then(function() {
      Alert.alert(
        'Logged In Successfully',
        '',
        [
          {text: 'Nice!', onPress: () => {finishAuth()}},
        ]
      );
    }).catch(function(err) {
      alert(err);
    });

    function finishAuth() {
      rootNavigator.immediatelyResetStack([Router.getRoute('rootNavigation', {authed: true})]);
    }
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
  },
  textPadding: {
    paddingLeft: 8,
    paddingRight: 8,
    paddingTop: 8,
    paddingBottom: 8,
  },
});
