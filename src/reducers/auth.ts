import { AUTHENTICATED, NOT_AUTHENTICATED } from '../actions';
import { IAuthReducer, IAuthState } from './types';

const initialState: IAuthState = {
  authChecked: false,
  loggedIn: false,
  currentUser: {},
};

const authReducer: IAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATED:
      return {
        authChecked: true,
        loggedIn: true,
        currentUser: action.payload,
      };
    case NOT_AUTHENTICATED:
      return {
        authChecked: true,
        loggedIn: false,
        currentUser: {},
      };
    default:
      return state;
  }
};

export default authReducer;
