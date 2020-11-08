import { combineReducers } from 'redux'
import tasksReducer from './tasksReducer'
import userReducer from './userReducer'

const rootReducer = combineReducers({
  tasks: tasksReducer,
  userData: userReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer