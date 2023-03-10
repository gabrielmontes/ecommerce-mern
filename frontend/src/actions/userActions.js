import axios from 'axios';
import { ORDER_LIST_MY_RESET } from '../constants/orderConstants';
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
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
  USER_DETAILS_RESET,
  USER_LIST_FAIL,
  USER_LIST_SUCCESS,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_UPDATE_REQUEST,
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

import { setMessage } from './notificationActions';

export const getUrlValidation = (id, token) => async (dispatch) => {
  try {
    dispatch({
      type: URL_PASSWD_REQUEST,
    })

    const { data } = await axios.get(`/api/users/valid/${id}/${token}`);

    dispatch({
      type: URL_PASSWD_RESET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: URL_PASSWD_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}


export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOGIN_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })

    localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch(setMessage("success", "Bienvenido."));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch(setMessage("error", error.response.data.message));
  }
}

export const newUser = (name, lastname, email, password, isAdmin) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_ADMIN_REGISTER_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(
      '/api/users/newuser', 
      { name, lastname, email, password, isAdmin }, 
      config
    );

    dispatch({
      type: USER_ADMIN_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch(setMessage("success", 'El usuario ha sido creado con ??xito.'));
  } catch (error) {
    dispatch({
      type: USER_ADMIN_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch(setMessage("error", error.response.data.message));
  }
}

export const logout = () => (dispatch) => {
  localStorage.clear();
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
  dispatch({ type: USER_LIST_RESET });
}

export const register = (name, lastname, email, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_REGISTER_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users',
      { name, lastname, email, password },
      config
    )

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });

    dispatch(setMessage("success", "El usuario ha sido creado, inicie sesi??n para continuar."));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    
    dispatch(setMessage("error", error.response.data.message));
  }
}



export const resetPassword = (email) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWD_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/forgot', { email }, config
    )

    dispatch({
      type: USER_PASSWD_SUCCESS,
      payload: data,
    });

    dispatch(setMessage("success", "Se ha enviado un correo con los pasos para reiniciar la contrase??a."));
  } catch (error) {
    dispatch({
      type: USER_PASSWD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch(setMessage("error", error.response.data.message));
  }
}

export const updatePassword = (id, token, password) => async (dispatch) => {
  try {
    dispatch({
      type: USER_PASSWD_RESET_REQUEST,
    })

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/reset', { id, token, password }, config
    )

    dispatch({
      type: USER_PASSWD_RESET_SUCCESS,
      payload: data,
    });

    dispatch(setMessage("success", "La contrase??a ha sido actualizada con ??xito."));
  } catch (error) {
    dispatch({
      type: USER_PASSWD_RESET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch(setMessage("error", error.response.data.message));
  }
}



export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DETAILS_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data,
    });

  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_PROFILE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    })
    
    localStorage.setItem('userInfo', JSON.stringify(data));

    dispatch(setMessage("success", "El usuario ha sido actualizado con ??xito."));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch(setMessage("error", error.response.data.message));
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_LIST_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/users`, config)

    dispatch({
      type: USER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_DELETE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch({ type: USER_DELETE_SUCCESS });

    dispatch(setMessage("success", "El usuario ha sido eliminado con ??xito."));
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch(setMessage("error", error.response.data.message));
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({
      type: USER_UPDATE_REQUEST,
    })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({ 
      type: USER_UPDATE_SUCCESS, 
      payload: data 
    });

    dispatch(setMessage("success", "El usuario ha sido modificado con ??xito."));
  } catch (error) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });

    dispatch(setMessage("error", error.response.data.message));
  }
}

