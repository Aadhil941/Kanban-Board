import {combineReducers} from "redux";
import {connectRouter} from 'connected-react-router'

import rootReducer from './strategyReducer';

export default (history) => combineReducers({
  router: connectRouter(history),
  project: rootReducer
});
