import { Dispatch } from 'react';
import { AUTHENTICATED, IS_LOADING, NOT_AUTHENTICATED } from '.';
import axios from 'axios';

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
    const url = 'https://www.mecallapi.com/api/login';

    const login = async () => {
      dispatch({
        type: IS_LOADING,
        payload: true,
      });
      axios
        .post(url, credentials, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then((res) => {
          const token = res.data.token;
          setToken(token);
          dispatch({
            type: AUTHENTICATED,
            payload: {
              token,
            },
          });
          dispatch({
            type: IS_LOADING,
            payload: false,
          });
        })
        .catch((err) => {
          console.log(err);
          dispatch({
            type: IS_LOADING,
            payload: false,
          });
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
