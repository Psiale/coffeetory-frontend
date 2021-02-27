/* eslint-disable no-console */
import axios from 'axios';

import { postRequest, getRequest } from '../../api/helpers';

import {
  ACCESS_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
} from '../constants/auth';

export const fetchRequestFailed = error => ({
  type: REQUEST_FAILED,
  payload: error,
});

export const fetchAccessRequest = (authToken, credentials) => ({
  type: ACCESS_REQUEST,
  payload: authToken,
  credentials,
});

export const fetchPending = () => ({
  type: REQUEST_PENDING,
});

export const fetchRequestSuccess = () => ({
  type: REQUEST_SUCCEED,
});

export const loginRequest = async data => dispatch => {
  dispatch(fetchPending());
  postRequest('auth/login', data).then(response => {
    const authToken = response.data;
    dispatch(fetchAccessRequest(authToken, data));
  });
};

export const signupRequest = data => async dispatch => {
  dispatch(fetchPending());
  postRequest('signup', data).then(response => {
    console.log(response);
    const authToken = response.data;
    dispatch(fetchAccessRequest(authToken, data));
  });

  // esto debe ir en la store que se ocupe de la información del negocio del usuario
  // export const getElementsRequest = authToken  => async dispatch => {
  //   dispatch(fetchPending());
  //   //ese auth_token lo voy a tomar del estado, obviamente
  //   axios.defaults.headers.common = { 'Authorization': `Bearer ${authToken}`};

  //   getRequest('coffee_shops').then(response => {
  //     console.log(response);
  //     const result = response.data;
  //     dispatch(nameOfTheFetchingFunction)
  //   })
  // };
  console.log('this is happening');
};
