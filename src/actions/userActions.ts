import { User, UserActionTypes, UserThunk } from '../types/userTypes'
import { fetchWithAuth } from '../concerns/fetchWithAuth'


export const setUser = (user: User): UserActionTypes => {
  return {type: 'SET_USER', payload: user}
}

export const loadingUser = (): UserActionTypes => {
  return {type: 'LOADING_USER'}
}

export const checkLoggedInStatus = (): UserThunk => {
  return dispatch => {
    dispatch(loadingUser())
    fetchWithAuth('http://localhost:3001/logged_in', 'GET')
    .then(data => {
      console.log(data)
      if (!data.errors) {
        dispatch(setUser(data))
      }
    })
  }
}
