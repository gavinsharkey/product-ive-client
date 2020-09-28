import { UserState, UserActionTypes } from '../types/userTypes'

const initialState: UserState = {
  user: {},
  status: 'loading',
  isLoggedIn: false,
  error: ''
}

export default (
  state = initialState, action: UserActionTypes
): UserState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        isLoggedIn: true,
        status: "ok"
      }
    case "LOADING_USER":
      return {
        ...state,
        user: state.user,
        status: 'loading'
      }
    case 'ERROR_LOADING_USER':
      return {
        ...state,
        status: 'error',
        isLoggedIn: false,
        error: action.payload
      }
    default:
      return state
  }
}