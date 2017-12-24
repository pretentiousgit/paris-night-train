// Action Types
export const INTERACTION = 'INTERACTION';
export const SET_PREF = 'SET_PREF';
export const GET_PREF = 'GET_PREF';

// Action Creators
const setPreference = () => ({
  type: SET_PREF
});

const getPreference = () => ({
  type: GET_PREF
});

export {
  setPreference,
  getPreference
};
