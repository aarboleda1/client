import React from 'react';
import {
  StyleSheet,
  View,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import {
  Notifications,
} from 'exponent';
import {
  StackNavigation,
  TabNavigation,
  TabNavigationItem,
} from '@exponent/ex-navigation';

import {
  FontAwesome,
} from '@exponent/vector-icons';

import Router from '../navigation/Router';

import Alerts from '../constants/Alerts';
import Colors from '../constants/Colors';
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

export default class RootNavigation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false,
    };
  }
  
  componentWillMount() {
    let nav = this.props.navigator;
    let context = this;
    AsyncStorage.getItem('AuthToken').then(function(AuthToken) {
      if (AuthToken === null) {
        nav.replace('auth');
      } else {
        context.setState({authed: true});
      }
    }).catch(function(err) {
      alert(err);
    });
  }

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return !this.state.authed ? (
        <View  style={styles.center}>
          <ActivityIndicator size="large"/>
        </View>
      ) : (
      <TabNavigation
        tabBarHeight={56}
        initialTab="search"
        navigatorUID="main">
        <TabNavigationItem
          id="search"
          renderIcon={isSelected => this._renderIcon('search', isSelected)}>
          <StackNavigation initialRoute="search" navigatorUID="search"/>
        </TabNavigationItem>

        <TabNavigationItem
          id="profile"
          renderIcon={isSelected => this._renderIcon('fire', isSelected)}>
          <StackNavigation initialRoute="chefActions" />
        </TabNavigationItem>

        <TabNavigationItem
          id="upcoming"
          renderIcon={isSelected => this._renderIcon('calendar', isSelected)}>
          <StackNavigation initialRoute="upcoming" />
        </TabNavigationItem>

        <TabNavigationItem
          id="settings"
          renderIcon={isSelected => this._renderIcon('cog', isSelected)}>
          <StackNavigation initialRoute="settings" />
        </TabNavigationItem>
      </TabNavigation>
    );
  }

  _renderIcon(name, isSelected) {
    return (
      <FontAwesome
        name={name}
        size={32}
        color={isSelected ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    // registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = ({origin, data}) => {
    this.props.navigator.showLocalAlert(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`,
      Alerts.notice
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  selectedTab: {
    color: Colors.tabIconSelected,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
