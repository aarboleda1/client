import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Button,
  Alert,
} from 'react-native';

import Router from '../navigation/Router';

export default class LoginScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Login',
    },
  }

  render() {
    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={this.props.route.getContentContainerStyle()}>
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
      rootNavigator.immediatelyResetStack([Router.getRoute('rootNavigation', {authed: true})], 0);
    }

    Alert.alert(
      'You pretended to Log In!',
      'Real user auth will be implemented soon!',
      [
        {text: 'ok...', onPress: () => {finishAuth()}},
      ]
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
  },
});
