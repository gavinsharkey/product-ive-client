import { Task, TasksActionTypes } from '../types/tasksTypes'

export const setTasks = (tasks: Task[]): TasksActionTypes => {
  return { type: 'SET_TASKS', tasks }
}

export const setSubTasks = (tasks: Task[], parentTaskId: number): TasksActionTypes => {
  return { type: 'SET_SUB_TASKS', tasks, parentTaskId }
}

export const addTask = (task: Task): TasksActionTypes => {
  return { type: 'ADD_TASK', task }
}

export const addSubTask = (task: Task, parentTaskId: number): TasksActionTypes => {
  return { type: 'ADD_SUB_TASK', task, parentTaskId }
}

export const updateTaskCompleted = (id: number): TasksActionTypes => {
  return { type: 'UPDATE_TASK_COMPLETED', id }
}

export const updateSubTaskCompleted = (id: number, parentTaskId: number): TasksActionTypes => {
  return { type: 'UPDATE_SUB_TASK_COMPLETED', id, parentTaskId}
}

export const updateTaskName = (id: number, name: string): TasksActionTypes => {
  return { type: 'UPDATE_TASK_NAME', id, name }
}

export const updateSubTaskName = (id: number, name: string, parentTaskId: number): TasksActionTypes => {
  return { type: 'UPDATE_SUB_TASK_NAME', id, name, parentTaskId }
}

export const deleteTask = (id: number): TasksActionTypes => {
  return { type: 'DELETE_TASK', id }
}

export const deleteSubTask = (id: number, parentTaskId: number): TasksActionTypes => {
  return { type: 'DELETE_SUB_TASK', id, parentTaskId }
}