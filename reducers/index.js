import { combineReducers } from 'redux';

import searchReducers from './searchReducers';
import mapContextReducers from './mapContextReducers';

/* Auth Reducers */
import tokenReducer from './auth/tokenReducer';
import currentChefReducer from './auth/currentChefReducer';
import currentUserReducer from './auth/currentUserReducer';

/* This combines all the separate reducers */
const rootReducer = combineReducers({
  AuthToken: tokenReducer,
  currentUser: currentUserReducer,
  currentChef: currentChefReducer,
  search: searchReducers,
  mapContext: mapContextReducers,
});

export default rootReducer;
