import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  Button
} from 'react-native';

export default class AuthScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Auth',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
        <Text style={styles.title}>Black Ocean</Text>
        <Button
          onPress={this._goToLogin.bind(this)}
          title="Login"
          />
        <Button
          onPress={this._goToSignup.bind(this)}
          title="Signup"
        />
      </ScrollView>
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
    paddingTop: 15,
  },
  title: {
    textAlign: 'center',
    fontSize: 32
  }
});
