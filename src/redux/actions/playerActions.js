// Action Types
export const INTERACTION = 'INTERACTION';
export const SET_FEELING = 'SET_FEELING';
export const SET_PREF = 'SET_PREF';
export const GET_PREF = 'GET_PREF';

// Action Creators
const setFeeling = (feeling) => ({
  type: SET_FEELING,
  feeling
});

const setPreference = () => ({
  type: SET_PREF
});

const getPreference = () => ({
  type: GET_PREF
});

export {
  setPreference,
  getPreference,
  setFeeling
};
