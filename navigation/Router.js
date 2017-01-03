import {
  createRouter,
} from '@exponent/ex-navigation';

/* Auth Screens */
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

/* Tab Bar Screens */
import SearchScreen from '../screens/SearchScreen';
import HomeScreen from '../screens/HomeScreen';
import UpcomingScreen from '../screens/UpcomingScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

import RootNavigation from './RootNavigation';

export default createRouter(() => ({
  auth: () => AuthScreen,
  login: () => LoginScreen,
  signup: () => SignupScreen,
  search: () => SearchScreen,
  home: () => HomeScreen,
  upcoming: () => UpcomingScreen,
  profile: () => ProfileScreen,
  settings: () => SettingsScreen,
  rootNavigation: () => RootNavigation,
}));
