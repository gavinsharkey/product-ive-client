import { User, UserError, UserActionTypes, UserThunk } from '../types/userTypes'
import { LoginValues } from '../pages/LoginPage'
import { SignupValues } from '../pages/SignupPage'
import { fetchWithAuth } from '../concerns/fetchWithAuth'


export const setUser = (user: User): UserActionTypes => {
  return {type: 'SET_USER', payload: user}
}

export const loadingUser = (): UserActionTypes => {
  return {type: 'LOADING_USER'}
}

export const errorLoadingUser = (errors: UserError): UserActionTypes => {
  return { type: 'ERROR_LOADING_USER', payload: errors }
}

export const checkLoggedInStatus = (): UserThunk<void> => {
  return dispatch => {
    dispatch(loadingUser())
    fetchWithAuth('http://localhost:3001/logged_in', 'GET')
    .then(data => {
      if (!data.errors) {
        dispatch(setUser(data))
      }
    })
  }
}

export const login = (values: LoginValues): UserThunk<Promise<any>> => {
  return async dispatch => {
    return fetchWithAuth('http://localhost:3001/login', 'POST', {
      ...values
    })
    .then(data => {
      if (!data.error) {
        dispatch(setUser(data.user))
        localStorage.setItem('_product_ive_token', data.jwt)
      }
      return data
    })
  }
}

export const signUp = (values: SignupValues): UserThunk<Promise<any>> => {
  return async dispatch => {
    return fetchWithAuth('http://localhost:3001/signup', 'POST', {
      user: {
        ...values
      }
    })
    .then(data => {
      if (!data.errors) {
        dispatch(setUser(data.user))
        localStorage.setItem('_product_ive_token', data.jwt)
      }
      return data
    })
  }
}
