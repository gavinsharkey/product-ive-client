import { TaskGroup } from './taskGroupTypes'
import { User } from './userTypes';
import { Errors } from './errorTypes'

// General
export interface Task {
  id: number
  taskable_type: 'TaskGroup' | 'User'
  name: string
  completed: boolean
  taskable: TaskGroup & User
  sub_tasks: Task[]
  errors?: Errors 
}

// Reducer
export type TasksState = Task[]

// Actions
export interface SetTasksAction {
  type: 'SET_TASKS'
  tasks: Task[]
}

export interface SetSubTasksAction {
  type: 'SET_SUB_TASKS'
  parentTaskId: number
  subTasks: Task[]
}

export interface AddTaskAction {
  type: 'ADD_TASK'
  task: Task
}

export interface AddSubTaskAction {
  type: 'ADD_SUB_TASK'
  parentTaskId: number
  task: Task
}

export interface UpdateTaskCompletedAction {
  type: 'UPDATE_TASK_COMPLETED'
  id: number
}

export interface UpdateSubTaskCompletedAction {
  type: 'UPDATE_SUB_TASK_COMPLETED'
  parentTaskId: number
  id: number
}

export interface UpdateTaskNameAction {
  type: 'UPDATE_TASK_NAME'
  id: number
  name: string
}

export interface UpdateSubTaskNameAction {
  type: 'UPDATE_SUB_TASK_NAME'
  parentTaskId: number
  id: number
  name: string
}

export interface DeleteTaskAction {
  type: 'DELETE_TASK'
  id: number
}

export interface DeleteSubTaskAction {
  type: 'DELETE_SUB_TASK'
  parentTaskId: number
  id: number
}

export type TasksActionTypes = 
  | SetTasksAction
  | SetSubTasksAction
  | AddTaskAction
  | AddSubTaskAction
  | UpdateTaskCompletedAction
  | UpdateSubTaskCompletedAction
  | UpdateTaskNameAction
  | UpdateSubTaskNameAction
  | DeleteTaskAction
  | DeleteSubTaskAction



