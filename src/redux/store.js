import { createStore, combineReducers, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension'; // PROD: 'redux-devtools-extension/logOnlyInProduction'

import counter from './reducers/counter';

// Dev tooling
const logger = createLogger();
const composeEnhancers = composeWithDevTools({
  // options
});

const reducer = combineReducers({
  counter
});

const middleware = composeEnhancers(applyMiddleware(logger));

export default createStore(reducer, middleware);