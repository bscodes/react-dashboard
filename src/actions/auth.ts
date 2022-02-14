import { Dispatch } from 'react';
import { AUTHENTICATED, NOT_AUTHENTICATED } from '.';

type TSetToken = (token: string) => void;

const setToken: TSetToken = (token) => {
  localStorage.setItem('accessToken', token);
};

type TGetToken = () => string | null | undefined;

const getToken: TGetToken = () => {
  return localStorage.getItem('accessToken');
};

type TCeckAuth = () => (dispatch: Dispatch<any>) => void;

export const checkAuth: TCeckAuth = () => {
  return (dispatch) => {
    const getCurrentUser = () => {
      const token: string | null | undefined = getToken();
      if (token) {
        dispatch({
          type: AUTHENTICATED,
          payload: {
            token,
          },
        });
      } else {
        dispatch({
          type: NOT_AUTHENTICATED,
        });
      }
    };
    return getCurrentUser();
  };
};

type TLogin = (credentials: any) => (dispatch: Dispatch<any>) => Promise<void>;

export const loginUser: TLogin = (credentials) => {
  return (dispatch) => {
    const login = async () => {
      await fetch('https://www.mecallapi.com/api/login', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      }).then((res: Response) => {
        if (res.ok) {
          return res.json().then((userJson) => {
            dispatch({ type: AUTHENTICATED, payload: userJson });
            setToken(userJson.accessToken);
          });
        } else {
          return res.json().then((errors) => {
            dispatch({ type: NOT_AUTHENTICATED });
            return Promise.reject(errors);
          });
        }
      });
    };
    return login();
  };
};

type TLogout = () => (dispatch: Dispatch<any>) => void;
export const logoutUser: TLogout = () => {
  return (dispatch) => {
    const logout = () =>
      dispatch({
        type: NOT_AUTHENTICATED,
        payload: window.localStorage.clear(),
      });
    return logout();
  };
};
