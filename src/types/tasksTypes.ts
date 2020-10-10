import { TaskGroup } from './taskGroupTypes'
import { User } from './userTypes';

export interface Task {
  id: number
  name: string
  completed: boolean
  taskable: TaskGroup & User
}