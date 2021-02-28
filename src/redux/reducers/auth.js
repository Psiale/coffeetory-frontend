import {
  ACCESS_REQUEST,
  REQUEST_FAILED,
  REQUEST_PENDING,
  REQUEST_SUCCEED,
} from '../constants/auth';

const initialState = {
  is_auth: false,
  loading: false,
  credentials: '',
  authToken: '',
  error: '',
};

const authReducer = (state = initialState, action) => {
  switch (action) {
    case REQUEST_PENDING:
      return {
        ...state,
        loading: true,
      };
    case ACCESS_REQUEST:
      return {
        ...state,
        is_auth: false,
        loading: true,
        credentials: action.credentials,
        auth_token: action.payload,
        error: '',
      };
    case REQUEST_FAILED:
      return {
        ...state,
        is_auth: false,
        loading: false,
        authToken: '',
        error: action.payload,
      };
    case REQUEST_SUCCEED:
      return {
        ...state,
        is_auth: true,
        loading: false,
      };
    default: return state;
  }
};

export default authReducer;
