/* eslint-disable no-unused-expressions */
/* eslint-disable camelcase */
/* eslint-disable no-console */
import { postRequest } from '../../api/helpers';

import {
  ACCESS_REQUEST,
  LOGIN_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
} from '../constants/auth';

export const fetchRequestFailed = error => ({
  type: REQUEST_FAILED,
  payload: error,
});

export const fetchAccessRequest = (type, authToken, info) => {
  console.log(`this is the authToken: ${authToken} and this the credentials: ${info}`);

  if (type === 'login') {
    return {
      type: LOGIN_REQUEST,
      payload: authToken,
      login_credentials: info,
    };
  }
  return {
    type: ACCESS_REQUEST,
    payload: authToken,
    credentials: info,
  };
};

export const fetchPending = () => ({
  type: REQUEST_PENDING,
});

export const fetchRequestSuccess = () => ({
  type: REQUEST_SUCCEED,
});

export const loginRequest = data => async dispatch => {
  dispatch(fetchPending());
  postRequest('auth/login', data).then(response => {
    const authToken = response.data;
    dispatch(fetchRequestSuccess());
    dispatch(fetchAccessRequest('login', authToken, data));
  }).catch(error => {
    console.log(error);
    dispatch(fetchRequestFailed(error));
  });
};

export const signupRequest = data => async dispatch => {
  dispatch(fetchPending());
  postRequest('signup', data).then(response => {
    console.log(response.data);
    console.log(`this are the credentials: ${data}`);
    const authToken = response.data;
    dispatch(fetchAccessRequest('signup', authToken, data));
  });

  // esto debe ir en la store que se ocupe de la información del negocio del usuario
  // export const getElementsRequest = authToken  => async dispatch => {
  //   dispatch(fetchPending());
  //   //ese auth_token lo voy a tomar del estado, obviamente
  // axios.defaults.headers.common = { Authorization: `Bearer ${authToken}` };

  //   getRequest('coffee_shops').then(response => {
  //     console.log(response);
  //     const result = response.data;
  //     dispatch(nameOfTheFetchingFunction)
  //   })
  // };
  console.log('this is happening');
};
