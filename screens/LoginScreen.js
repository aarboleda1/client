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

import {
  setAuthToken,
  setCurrentChef,
  setCurrentUser,
} from '../actions/authActions';

import Router from '../navigation/Router';

import { serverURI } from '../config';

import { connect } from 'react-redux';

class LoginScreen extends React.Component {
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

  _verifyLoginFields() {
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

  _doLogin() {
    if (!this._verifyLoginFields.call(this)) {
      return;
    }

    let loginData = {
      email: this.state.email,
      password: this.state.password,
    }

    let context = this;

    fetch(`${serverURI}/login`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(loginData)
    }).then(function(resp) {
      if(resp.headers.map['content-type'][0] === "application/json; charset=utf-8") {
        return resp.json();
      } else {
        return resp.text().then(function(message) {
          throw new Error(message);
        });
      }
    })
    .then(function(data) {
      let chefId = null
      console.log(typeof data.chefId, 'DATACHEFIDtype ');
      console.log( data.chefId, 'DATACHEFID');
      if (data.chefId !== null) {
        chefId = data.chefId.toString();
      }

      context.props.dispatch(setAuthToken(data.AuthToken));
      context.props.dispatch(setCurrentUser(data.id.toString()));
      context.props.dispatch(setCurrentChef(chefId));
      return AsyncStorage.multiSet([
        ['AuthToken', data.AuthToken],
        ['currentUser', data.id.toString()],
        ['currentChef', JSON.stringify(chefId)],
      ]);
    }).then(function() {
      Alert.alert(
        'Logged In Successfully',
        '',
        [
          {text: 'Nice!', onPress: () => {finishAuth()}},
        ]
      );
    }).catch(function(err) {
      Alert.alert(err.message);
    });

    const rootNavigator = this.props.navigation.getNavigator('root');
    function finishAuth() {
      rootNavigator.immediatelyResetStack([Router.getRoute('rootNavigation')]);
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

export default connect(null)(LoginScreen);
