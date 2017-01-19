import {
  createRouter,
} from '@exponent/ex-navigation';

/* Auth Screens */
import AuthScreen from '../screens/AuthScreen';
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';

/* Tab Bar Screens */
import ProfileScreen from '../screens/ProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import SettingsScreen from '../screens/SettingsScreen';
import UpcomingScreen from '../screens/UpcomingScreen';

/* Other Screens */
import ChefActionsScreen from '../screens/ChefActionsScreen';
import ChefPageViewScreen from '../screens/ChefPageViewScreen';
import ChooseLocationScreen from '../screens/ChooseLocationScreen';
import ConfirmEventScreen from '../screens/ConfirmEventScreen';
import EventDetailsScreen from '../screens/EventDetailsScreen';
import MapScreen from '../screens/MapScreen';
import RootNavigation from './RootNavigation';
import SearchResultsScreen from '../screens/SearchResultsScreen';

/*Dish Creation Screens*/
import CreateDishScreen from '../screens/CreateDishScreen';
import DishPreviewOnlyScreen from '../screens/DishPreviewOnlyScreen';

export default createRouter(() => ({
  auth: () => AuthScreen,
  login: () => LoginScreen,
  signup: () => SignupScreen,

  profile: () => ProfileScreen,
  search: () => SearchScreen,
  settings: () => SettingsScreen,
  upcoming: () => UpcomingScreen,

  chefActions: () => ChefActionsScreen,
  chefPageView: () => ChefPageViewScreen,
  chooseLocation: () => ChooseLocationScreen,
  confirmEvent: () => ConfirmEventScreen,
  eventDetailsView: () => EventDetailsScreen,
  map: () => MapScreen,
  rootNavigation: () => RootNavigation,
  searchResults: () => SearchResultsScreen,
  
  createDishView: () => CreateDishScreen,
  dishPreviewOnlyView: () => DishPreviewOnlyScreen,

}));
