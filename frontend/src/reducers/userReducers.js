import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_RESET,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_RESET,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_FAIL,
  USER_PASSWD_REQUEST,
  USER_PASSWD_FAIL,
  USER_PASSWD_SUCCESS,
  USER_PASSWD_RESET_REQUEST,
  USER_PASSWD_RESET_FAIL,
  USER_PASSWD_RESET_SUCCESS,
  USER_ADMIN_REGISTER_REQUEST,
  USER_ADMIN_REGISTER_SUCCESS,
  USER_ADMIN_REGISTER_FAIL,
  URL_PASSWD_REQUEST,
  URL_PASSWD_RESET_SUCCESS,
  URL_PASSWD_RESET_FAIL,
} from '../constants/userConstants';

export const userUrlValidationReducer = (state = {}, action) => {
  switch (action.type) {
    case URL_PASSWD_REQUEST:
      return { loading: true }
    case URL_PASSWD_RESET_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case URL_PASSWD_RESET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true }
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload }
    case USER_LOGOUT:
      return {}
    default:
      return state
  }
}

export const userPasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWD_REQUEST:
      return { loading: true }
    case USER_PASSWD_SUCCESS:
      return { loading: false, message: action.payload.message }
    case USER_PASSWD_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdatePasswordResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PASSWD_RESET_REQUEST:
      return { loading: true }
    case USER_PASSWD_RESET_SUCCESS:
      return { loading: false, message: action.payload.message }
    case USER_PASSWD_RESET_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true }
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload }
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_DETAILS_REQUEST:
      return { ...state, loading: true }
    case USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload }
    case USER_DETAILS_FAIL:
      return { loading: false, error: action.payload }
    case USER_DETAILS_RESET:
      return { user: {} }
    default:
      return state
  }
}

export const userUpdateProfileReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_UPDATE_PROFILE_REQUEST:
      return { loading: true }
    case USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_LIST_REQUEST:
      return { loading: true, users: [] }
    case USER_LIST_SUCCESS:
      return { loading: false, users: action.payload }
    case USER_LIST_FAIL:
      return { loading: false, error: action.payload }
    case USER_LIST_RESET:
      return { users: [] }
    default:
      return state
  }
}

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true }
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true }
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
}

export const userUpdateReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_UPDATE_REQUEST:
      return { loading: true }
    case USER_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload }
    case USER_UPDATE_FAIL:
      return { loading: false, error: action.payload.message }
    case USER_UPDATE_RESET:
      return {
        user: {},
      }
    default:
      return state
  }
}

export const newUserReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_ADMIN_REGISTER_REQUEST:
      return { loading: true }
    case USER_ADMIN_REGISTER_SUCCESS:
      return { loading: false, success: true, message: action.payload }
    case USER_ADMIN_REGISTER_FAIL:
      return { loading: false, error: action.payload }
    default:
      return state
  }
};