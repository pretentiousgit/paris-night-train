import {
  INTERACTION,
  SET_PREF,
  GET_PREF
} from '../actions/playerActions';

import initialState from '../fullState';

export default function(state = initialState, action) {
  switch (action.type) {
  case INTERACTION:
    return state;
  case SET_PREF:
    return state;
  case GET_PREF:
    return state;
  default:
    return state;
  }
}