import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
// general types
export interface User {
  id?: number
  display_name?: string
  email?: string
  password_digest?: string
  created_at?: string
  updated_at?: string
}

export type UserError = string | string[]

// state
export interface UserState {
  user: User
  status: 'loading' | 'error' | 'ok'
  isLoggedIn: boolean
  error: UserError
}

// actions
interface SetUserAction {
  type: 'SET_USER',
  payload: User
}

interface LoadingUserAction {
  type: 'LOADING_USER'
}

interface ErrorLoadingUserAction {
  type: 'ERROR_LOADING_USER',
  payload: UserError
}

interface LogoutUserAction {
  type: 'LOGOUT_USER'
}

export type UserActionTypes = 
  | SetUserAction 
  | LoadingUserAction 
  | ErrorLoadingUserAction 
  | LogoutUserAction

// thunk
export type UserThunk<ReturnType> = ThunkAction<
  ReturnType,
  UserState,
  unknown,
  UserActionTypes
>

export type UserThunkDispatch = ThunkDispatch<
  UserState,
  unknown,
  AnyAction
>