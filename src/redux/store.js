import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'; // PROD: 'redux-devtools-extension/logOnlyInProduction'

import player from './reducers/player';

// Dev tooling
const logger = createLogger();
const composeEnhancers = composeWithDevTools({
  // options
});

const reducer = combineReducers({
  player
});

const middleware = composeEnhancers(applyMiddleware(logger));

export default createStore(reducer, middleware);