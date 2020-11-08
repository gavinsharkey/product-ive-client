import { TasksState, TasksActionTypes} from '../types/tasksTypes'

const initialState: TasksState = []

export default (
  state = initialState, action: TasksActionTypes
): TasksState => {
  switch (action.type) {
    case "SET_TASKS":
      return action.tasks
    case "SET_SUB_TASKS":
      return state.map(task => {
        if (task.id === action.parentTaskId) {
          return { ...task, sub_tasks: action.subTasks }
        } else {
          return task
        }
      })
    case "ADD_TASK":
      return [...state, action.task]
    case "ADD_SUB_TASK":
      return state.map(task => {
        return task.id === action.parentTaskId
        ? { ...task, sub_tasks: [...task.sub_tasks, action.task] }
        : task
      })
    case "UPDATE_TASK_COMPLETED":
      return state.map(task => {
        return task.id === action.id
        ? { ...task, completed: !task.completed }
        : task
      })
    case 'UPDATE_SUB_TASK_COMPLETED':
      return state.map(task => {
        if (task.id === action.parentTaskId) {
          const sub_tasks = task.sub_tasks.map(subTask => {
            return subTask.id === action.id
            ? { ...subTask, completed: !subTask.completed }
            : subTask
          })

          return { ...task, sub_tasks }
        } else {
          return task
        }
      })
    case "UPDATE_TASK_NAME":
      return state.map(task => {
        return task.id === action.id
        ? { ...task, name: action.name }
        : task
      })
    case "UPDATE_SUB_TASK_NAME":
      return state.map(task => {
        if (task.id === action.parentTaskId) {
          const sub_tasks = task.sub_tasks.map(subTask => {
            return subTask.id === action.id
            ? { ...subTask, name: action.name }
            : subTask
          })

          return { ...task, sub_tasks }
        } else {
          return task
        }
      })
    case "DELETE_TASK":
      return state.filter(task => task.id !== action.id)
    case "DELETE_SUB_TASK":
      return state.map(task => {
        return task.id === action.parentTaskId
        ? { ...task, sub_tasks: task.sub_tasks.filter(subTask => subTask.id !== action.id) }
        : task
      })
    default:
      return state
  }
}