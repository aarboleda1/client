import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
  TextInput,
  AsyncStorage,
} from 'react-native';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  setAuthToken,
  setCurrentUser,
} from '../actions/authActions';

import Router from '../navigation/Router';

import { serverURI } from '../config';

class SignupScreen extends React.Component {
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
        style={[styles.container, styles.textPadding]}
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

  _verifySignupFields() {
    if (this.state.password !== this.state.verify) {
      Alert.alert(
        'Passwords do not match',
        'Please fix this and try again',
        [{text: 'Ok!'}]
      );
      return false;
    }

    if (!this.state.name) {
      Alert.alert(
        'Name cannot be left empty',
        '',
        [{text: 'Ok!'}]
      );
      return false;
    }

    if (!this.state.email) {
      Alert.alert(
        'E-Mail cannot be left empty',
        '',
        [{text: 'Ok!'}]
      );
      return false;
    }

    if (!this.state.password) {
      Alert.alert(
        'Password cannot be left empty',
        '',
        [{text: 'Ok!'}]
      );
      return false;
    }

    return true;
  }

  _doSignup() {
    // TODO: Disable button while waiting for response from server
    // and show loading indicator
    if (!this._verifySignupFields.call(this)) {
      return;
    }
    let signupData = {
      name: this.state.name.trim(),
      email: this.state.email.trim(),
      password: this.state.password.trim(),
      bio: 'No description set.',
    };

    const context = this;

    fetch(`${serverURI}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(signupData)
    }).then(function(resp) {
      if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
        return resp.json();
      } else {
        return resp.text().then(function(message) {
          throw new Error(message);
        });
      }
    })
    .then(function (data) {
      context.props.dispatch(setAuthToken(data.AuthToken));
      context.props.dispatch(setCurrentUser(data.id.toString()));

      return AsyncStorage.multiSet([
        ['AuthToken', data.AuthToken],
        ['currentUser', data.id.toString()],
      ]);
    }).then(function() {
      Alert.alert(
        'Registered successfully',
        '',
        [{text: 'Nice!', onPress: () => {finishAuth()}}])
    }).catch(function(err) {
      Alert.alert(err.message);
    });

    const rootNavigator = this.props.navigation.getNavigator('root');
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

export default connect(null)(SignupScreen);
