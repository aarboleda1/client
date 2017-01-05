import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button,
  View,
  Dimensions,
} from 'react-native';

const {height, width} = Dimensions.get('window');

export default class AuthScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
      title: 'Auth',
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Black Ocean</Text>
        <View style={styles.buttonJustifier}>
          <View style={styles.buttonSpacer}>
            <Button
              onPress={this._goToLogin.bind(this)}
              title="Login"
              />
            <Button
              onPress={this._goToSignup.bind(this)}
              title="Signup"
            />
          </View>
        </View>
      </View>
    );
  }

  _goToLogin() {
    this.props.navigator.push('login');
  }

  _goToSignup() {
    this.props.navigator.push('signup');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 48,
    paddingTop: 48,
    alignItems: 'center'
  },
  title: {
    fontSize: 32,
  },
  buttonJustifier: {
    flex: 0.8,
    justifyContent: 'flex-end',
  },
  buttonSpacer: {
    height: height * 0.2,
    width: width * 0.60,
    justifyContent: 'space-around',
  }
});
