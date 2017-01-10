import {combineReducers} from 'redux';
import chefView from './chefPageViewReducer'

// Define rootReducer
const rootReducer = combineReducers({
	chefView: chefView
});

export default rootReducer;


/*

This is our root reducer

*/
