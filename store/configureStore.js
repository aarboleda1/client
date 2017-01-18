import {createStore, applyMiddleware} from 'redux';
import rootReducer from '../reducers/index.js' /*make sure this imports index.js*/
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';

const initialState = {
  search: {
    restrictions: {},
    prices: {},
  },
};

// This will be used at the entry point of our application
export default function configureStore() {
	return createStore(
		rootReducer,
		initialState,
		// applyMiddleware(reduxImmutableStateInvariant())
  )
}

// reduxImmutableStateInvariant = Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches
``