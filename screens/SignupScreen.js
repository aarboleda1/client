import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  AsyncStorage,
} from 'react-native';

import Router from '../navigation/Router';

export default class SignupScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Signup',
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      verify: '',
    };
  }

  update(key, value) {
    let updateState = {};
    updateState[key] = value;
    this.setState(updateState);
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <TextInput
          onChangeText={this.update.bind(this, 'name')}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          maxLength={64}
          autoCapitalize="words"
          placeholder="Full Name"
        />
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
        <TextInput
          onChangeText={this.update.bind(this, 'verify')}
          style={styles.formInput}
          underlineColorAndroid="rgba(0,0,0,0)"
          maxLength={32}
          autoCapitalize="none"
          placeholder="Verify Password"
          secureTextEntry={true}
        />
        <Button
          onPress={this._doSignup.bind(this)}
          title="Signup!"
        />
      </ScrollView>
    );
  }

  _doSignup() {
    // TODO: Disable button while waiting for response from server
    // and show loading indicator
    const rootNavigator = this.props.navigation.getNavigator('root');

    //TODO: Add more validation
    if (this.state.password !== this.state.verify) {
      Alert.alert(
        'Passwords do not match',
        'Please fix this and try again',
        [{text: 'Ok!'}]
        );
    } else {
      let signupData = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
      };

      fetch('http://localhost:3000/signup/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData)
      }).then(resp => resp.json())
      .then(function (data) {
        return AsyncStorage.setItem('AuthToken', data.AuthToken);
      }).then(function() {
        Alert.alert(
          'Registered successfully',
          '',
          [{text: 'Nice!', onPress: () => {finishAuth()}}])
      }).catch(function(err) {
        alert(err);
      });

      function finishAuth() {
        rootNavigator.immediatelyResetStack([Router.getRoute('rootNavigation', {authed: true})]);
      }
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
  }
});
