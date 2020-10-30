import { createStore, combineReducers} from 'redux';
import authReducers from '../reducers/reducers.js'
import {loadState, saveState} from '../localStorage';

const finalReducer = combineReducers({authReducers});
const persistedState = loadState();

export const initialState = (persistedState=== undefined) ?

{
  isloggedin: false, 
  signedinemail: "", 
  firstname: "", 
  lastname: ""
} : 
persistedState;

const store = 
    createStore(authReducers, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

store.subscribe(() => {
  saveState(store.getState());
});

export default store;

