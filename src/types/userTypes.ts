import { AnyAction } from 'redux'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
// general types
export interface User {
  display_name: string
  email: string
  password_digest?: string
  created_at?: string
  updated_at?: string
}

export type UserError = string | string[]

// state
export interface UserState {
  user: User | {}
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

export type UserActionTypes = SetUserAction | LoadingUserAction | ErrorLoadingUserAction

// thunk
export type UserThunk<ReturnType> = ThunkAction<
  ReturnType,
  UserState,
  unknown,
  AnyAction
>

export type UserThunkDispatch = ThunkDispatch<
  UserState,
  unknown,
  AnyAction
>